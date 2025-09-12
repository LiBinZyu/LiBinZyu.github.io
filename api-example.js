// 后端API示例文件
// 这个文件展示了如何处理联系表单和点赞数据
// 实际部署时需要根据你的后端技术栈进行调整

const express = require('express');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库存储
let contactMessages = [];
let projectStars = {};

// 联系表单API
app.post('/api/contact', (req, res) => {
  try {
    const { name, message, timestamp, userAgent, referrer } = req.body;
    
    // 验证必填字段
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Message is required and must be at least 10 characters' 
      });
    }
    
    // 创建消息对象
    const contactMessage = {
      id: Date.now().toString(),
      name: name || 'Anonymous',
      message: message.trim(),
      timestamp: timestamp || new Date().toISOString(),
      userAgent,
      referrer,
      ip: req.ip,
      createdAt: new Date()
    };
    
    // 存储消息（实际项目中应该存储到数据库）
    contactMessages.push(contactMessage);
    
    // 发送邮件通知（可选）
    sendEmailNotification(contactMessage);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      id: contactMessage.id 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 项目点赞API
app.post('/api/stars', (req, res) => {
  try {
    const { projectId, action, timestamp, userAgent, referrer } = req.body;
    
    if (!projectId || !action) {
      return res.status(400).json({ error: 'Project ID and action are required' });
    }
    
    // 初始化项目点赞数据
    if (!projectStars[projectId]) {
      projectStars[projectId] = {
        count: 0,
        actions: []
      };
    }
    
    // 记录点赞行为
    const starAction = {
      id: Date.now().toString(),
      projectId,
      action,
      timestamp: timestamp || new Date().toISOString(),
      userAgent,
      referrer,
      ip: req.ip,
      createdAt: new Date()
    };
    
    projectStars[projectId].actions.push(starAction);
    
    // 更新点赞数量
    if (action === 'star') {
      projectStars[projectId].count++;
    } else if (action === 'unstar') {
      projectStars[projectId].count = Math.max(0, projectStars[projectId].count - 1);
    }
    
    res.json({ 
      success: true, 
      count: projectStars[projectId].count,
      action 
    });
    
  } catch (error) {
    console.error('Star action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 获取项目点赞统计
app.get('/api/stars/:projectId', (req, res) => {
  try {
    const { projectId } = req.params;
    const projectData = projectStars[projectId];
    
    if (!projectData) {
      return res.json({ count: 0, actions: [] });
    }
    
    res.json({
      count: projectData.count,
      actions: projectData.actions.slice(-10) // 返回最近10条记录
    });
    
  } catch (error) {
    console.error('Get stars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 获取所有联系消息（管理员接口）
app.get('/api/admin/messages', (req, res) => {
  try {
    // 这里应该添加身份验证
    res.json({
      messages: contactMessages,
      total: contactMessages.length
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 发送邮件通知函数
async function sendEmailNotification(contactMessage) {
  try {
    // 这里集成邮件服务，如Nodemailer、SendGrid等
    console.log('New contact message:', contactMessage);
    
    // 示例：使用Nodemailer
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransporter({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });
    
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: 'your-email@example.com',
    //   subject: 'New Contact Form Submission',
    //   html: `
    //     <h2>New Contact Message</h2>
    //     <p><strong>Name:</strong> ${contactMessage.name}</p>
    //     <p><strong>Message:</strong> ${contactMessage.message}</p>
    //     <p><strong>Time:</strong> ${contactMessage.timestamp}</p>
    //   `
    // };
    
    // await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 导出app用于测试
module.exports = app;
