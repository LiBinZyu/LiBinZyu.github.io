// Personal Portfolio Data
// 个人作品集数据

const portfolioData = {
  // Profile Information
  profile: {
    name: {
      zh: "李炳儒",
      en: "Li Bing Ru"
    },
    title: {
      zh: "技术美术 & 人机交互研究生",
      en: "Technical Artist & HCI Graduate Student"
    },
    location: {
      zh: "现居中国苏州",
      en: "Based in Suzhou, China"
    },
    image: "assets/images/profile.png",
    cvUrl: "http://lc-KPCSue6i.cn-n1.lcfile.com/oop124OJ2kQWJWpozB2LHHHh4C1oay8m/%E6%9D%8E%E7%82%B3%E5%84%92-%E8%A5%BF%E4%BA%A4%E5%88%A9%E7%89%A9%E6%B5%A6%E4%BA%BA%E6%9C%BA%E4%BA%A4%E4%BA%92%E7%A1%95%E5%A3%AB-%E4%B8%AD%E6%96%87.pdf"
  },

  // Experiences Data
  experiences: [
    {
      id: "exp-1",
      title: {
        zh: "人机交互，全日制硕士研究生",
        en: "Human-Computer Interaction, Full-time Master's Student"
      },
      company: {
        zh: "西交利物浦大学",
        en: "Xi'an Jiaotong-Liverpool University"
      },
      period: {
        zh: "2024年9月 - 2026年3月",
        en: "September 2024 - March 2026"
      },
      description: {
        zh: "核心课程：数据可视化、机器学习、数据挖掘和分析、人工智能、人机交互",
        en: "Core courses: Data Visualization, Machine Learning, Data Mining and Analysis, Artificial Intelligence, Human-Computer Interaction"
      },
      tags: ["Data Visualization", "Machine Learning", "AI", "HCI", "Research"]
    },
    {
      id: "exp-2",
      title: {
        zh: "数字媒体技术，全日制统招本科",
        en: "Digital Media Technology, Full-time Bachelor's Degree"
      },
      company: {
        zh: "成都大学",
        en: "Chengdu University"
      },
      period: {
        zh: "2016年9月 - 2020年6月",
        en: "September 2016 - June 2020"
      },
      description: {
        zh: "成绩：86/100。核心课程：C语言、C++、数据结构与算法、计算机图形学、游戏开发基础、数字媒体技术基础、虚拟现实、3D建模技术、数字媒体艺术基础、平面设计、网页开发技术等",
        en: "GPA: 86/100. Core courses: C Language, C++, Data Structures and Algorithms, Computer Graphics, Game Development Fundamentals, Digital Media Technology, Virtual Reality, 3D Modeling, Digital Media Art, Graphic Design, Web Development"
      },
      tags: ["C/C++", "Computer Graphics", "Game Development", "3D Modeling", "VR", "Web Development"]
    },
    {
      id: "exp-3",
      title: {
        zh: "技术美术",
        en: "Technical Artist"
      },
      company: {
        zh: "粒界科技",
        en: "GritWorld Technology"
      },
      period: {
        zh: "2021年7月 - 2024年3月",
        en: "July 2021 - March 2024"
      },
      description: {
        zh: "作为技术美术开发XR、移动端游戏优化、BYD方程豹8车机，个人编写4个专利，联合申请6个软著。基于自研引擎开发AR、车机等解决方案。",
        en: "As Technical Artist developed XR, mobile game optimization, BYD Fangchengbao 8 car system. Personally wrote 4 patents and jointly applied for 6 software copyrights. Developed AR and car system solutions based on proprietary engine."
      },
      tags: ["XR", "AR", "Game Optimization", "Car System", "Patents", "Proprietary Engine"]
    },
    {
      id: "exp-4",
      title: {
        zh: "技术美术",
        en: "Technical Artist"
      },
      company: {
        zh: "腾讯云",
        en: "Tencent Cloud"
      },
      period: {
        zh: "2020年9月 - 2021年3月",
        en: "September 2020 - March 2021"
      },
      description: {
        zh: "3D特效和模型开发，使用自研引擎、Unity、Unreal Engine以及DCC工具进行项目开发。设计公司内部资产库规范，维护美术工作流程，保证资产质量。主导了上海地铁后台大屏、宝龙地产大屏、北京大兴机场等智慧城市项目，使用自研引擎进行特效渲染，开发地理信息蓝图工具，成功完成1600W项目开发。",
        en: "3D effects and model development using proprietary engine, Unity, Unreal Engine and DCC tools. Designed internal asset library standards, maintained art workflows, ensured asset quality. Led smart city projects including Shanghai Metro backend screen, Powerlong Real Estate screen, Beijing Daxing Airport, using proprietary engine for effect rendering and developing geographic information blueprint tools, successfully completed 16M project development."
      },
      tags: ["3D Effects", "Unity", "Unreal Engine", "Smart City", "Asset Pipeline", "Project Management"]
    },
    
    {
      id: "exp-8",
      title: {
        zh: "证书·奖项·专利",
        en: "Certificates·Awards·Patents"
      },
      company: {
        zh: "专业认证与荣誉",
        en: "Professional Certifications & Honors"
      },
      period: {
        zh: "2016年 - 2023年",
        en: "2016 - 2023"
      },
      description: {
        zh: "• PMP 项目管理专业人士证书, 2023\n• Professional Scrum Master 证书, 2023\n• 2016，2017，2018 成都大学本科荣誉奖学金\n• 成都大学优秀毕业生\n• SK Sunny 中国杰出大学生志愿者\n• 一种用于虚拟现实应用的基于语义信息的地形绘制方法，2022\n• 房屋立体模型显示方法、装置、介质及电子设备，2022",
        en: "• PMP Project Management Professional Certificate, 2023\n• Professional Scrum Master Certificate, 2023\n• 2016, 2017, 2018 Chengdu University Undergraduate Honor Scholarship\n• Chengdu University Outstanding Graduate\n• SK Sunny China Outstanding College Student Volunteer\n• A terrain rendering method based on semantic information for virtual reality applications, 2022\n• House 3D model display method, device, medium and electronic equipment, 2022"
      },
      tags: ["PMP", "Scrum Master", "Scholarship", "Outstanding Graduate", "Patents", "Volunteer"]
    }
  ],

  // Projects Data
  projects: [
    {
      id: "proj-1",
      title: {
        zh: "VAI - Unity 语音控制插件",
        en: "VAI - Unity Voice AI Assistant"
      },
      description: {
        zh: "VAI 是一个 Unity 插件，用于在 Unity 项目中实现语音控制。它集成了唤醒词检测、自动语音识别 (ASR) 和由大语言模型 (LLM) 驱动的工具调用，可将用户的自然语言语音转化为可执行的函数。项目通过本地 NLU 模块的优化来减少 LLM 的调用频率。",
        en: "VAI is a Unity plugin for implementing voice control in Unity projects. It integrates wake word detection, automatic speech recognition (ASR) and large language model (LLM) driven tool calling, converting users' natural language speech into executable functions. The project optimizes local NLU modules to reduce LLM call frequency."
      },
      videos: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/w9rDSJix5avKAy7YvmPMxqKHF4Q8fRrr/VAIdemos.mp4"
      ],
      tech: ["Unity", "C#", "AI", "ASR", "LLM", "Voice Control"],
      links: {
        github: "https://github.com/LiBinZyu/VAI"
      },
      stars: 0,
      featured: true,
      date: "2025-03-01"
    },
    {
      id: "proj-2",
      title: {
        zh: "CameraArrayTools - UE5 相机批渲染插件",
        en: "CameraArrayTools - UE5 Camera Batch Rendering Plugin"
      },
      description: {
        zh: "CameraArrayTools 旨在将繁琐、重复的相机阵列创建与批量渲染工作流转变为一种快速、精确且自动化的流程。告别手动放置相机的低效与误差，通过一个统一的控制面板，即可生成、管理并渲染复杂的相机阵列，通过 Movie Render Queue 管线渲染，支持 path tracing 时间监控。",
        en: "CameraArrayTools aims to transform tedious, repetitive camera array creation and batch rendering workflows into a fast, precise and automated process. Say goodbye to inefficient manual camera placement and errors, generate, manage and render complex camera arrays through a unified control panel, with Movie Render Queue pipeline rendering and path tracing time monitoring support."
      },
      videos: ["http://lc-KPCSue6i.cn-n1.lcfile.com/QhTwmxJWrJV5EnRTNLKTVTpQYmC4lARl/CameraArrayToolsVideo480.mp4"],
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/fvPxHfO3isBLqwD8Vo1Ik93aE9Ec9WT4/CameraArrayTools.jpg"
      ],
      tech: ["Unreal Engine 5", "C++", "Python", "Movie Render Queue", "Path Tracing"],
      links: {
        github: "https://github.com/LiBinZyu/CameraArrayTools"
      },
      stars: 0,
      featured: true,
      date: "2025-07-01"
    },
    {
      id: "proj-3",
      title: {
        zh: "混合现实的人体结构可视交互系统",
        en: "Mixed Reality Human Anatomy Visualization System"
      },
      description: {
        zh: "使用Unity和Quest3头显开发的系统通过手势交互（Meta XR SDK）来让用户探索人体的各个结构，包括了肌肉、内脏、骨骼等50个模型和8类结构。通过实验和数据分析证明，MR的方式比起传统的电脑游戏或者图书更能让用户记住人体内部深层结构，用户体验显著更好，更低的沮丧，更好的performance。",
        en: "A system developed using Unity and Quest3 headset that allows users to explore various human structures through gesture interaction (Meta XR SDK), including 50 models and 8 types of structures such as muscles, organs, and bones. Experimental and data analysis results prove that MR approach helps users remember deep internal human structures better than traditional computer games or books, with significantly better user experience, lower frustration, and better performance."
      },
      videos: ["http://lc-KPCSue6i.cn-n1.lcfile.com/hOLx49wBEe8wb15vcSVDrDeoqnVqyC1b/Anatomy_ISMAR2025.mp4"],
      tech: ["Unity", "Quest3", "Meta XR SDK", "Mixed Reality", "Medical Visualization"],
      links: {
      },
      stars: 0,
      featured: true,
      date: "2024-11-01"
    },
    {
      id: "proj-4",
      title: {
        zh: "基于MR的即时心脏复苏引导系统",
        en: "MR-based Immediate CPR Guidance System"
      },
      description: {
        zh: "使用Unity和Quest3头显开发的RescueReality app 将引导没有接受过应急培训的普通人对其他人执行即时的心脏复苏。结果将展示系统的有效性、良好的用户体验、中等程度的任务负荷，从而增加紧急情况下的抢救实施率。",
        en: "RescueReality app developed using Unity and Quest3 headset guides untrained ordinary people to perform immediate CPR on others. Results demonstrate system effectiveness, good user experience, moderate task load, thereby increasing rescue implementation rate in emergency situations."
      },
      images: [
        "assets/images/CPR1.jpg",
        "assets/images/CPR2.jpg"
      ],
      videos: [],
      tech: ["Unity", "Quest3", "Mixed Reality", "Medical Training", "Emergency Response"],
      links: {
      },
      stars: 0,
      featured: true,
      date: "2024-10-01"
    },
    {
      id: "proj-5",
      title: {
        zh: "MR Creator - 混合现实编辑器软件",
        en: "MR Creator - Mixed Reality Editor Software"
      },
      description: {
        zh: "一款实现AR项目的快速落地的混和现实内容创作软件，面向第三方用户与开发者。丰富了MR应用场景：在同一空间内体验游戏、AI对话等交互。该产品在多种平台上应用，包括智能手机、平板电脑等。加强MR核心技术实力：采用的VPS技术轻松应对大面积地图，保证关键点位定位精准的前提下，在更大的范围内实现全覆盖。",
        en: "A mixed reality content creation software for rapid AR project implementation, targeting third-party users and developers. Enriched MR application scenarios: experience games, AI dialogue and other interactions in the same space. The product is applied on multiple platforms including smartphones, tablets, etc. Strengthened MR core technical capabilities: VPS technology easily handles large-area maps, achieving full coverage in larger ranges while ensuring precise positioning of key points."
      },
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/oG3VWf5C7GNs9YoXe4eV8eNjeorGJhwv/MRcreator.jpg"
      ],
      videos: [],
      tech: ["Mixed Reality", "AR", "VPS", "SLAM", "Cross-platform", "No-code"],
      links: {
      },
      stars: 0,
      featured: true,
      date: "2023-12-01"
    },
    {
      id: "proj-6",
      title: {
        zh: "BYD 方程豹8 车机3D场景",
        en: "BYD Fangchengbao 8 Car System 3D Scene"
      },
      description: {
        zh: "使用自研引擎针对比亚迪新车型的中控、副驾驶、仪表盘三个屏幕进行开发。根据高清影视级设计稿提出优化方案，设计天气、灯光、氛围特效和转场特效，排查解决模型布线问题。沉淀针对车机的模型制作标准和美术工作流。",
        en: "Developed for BYD's new car model's central control, co-pilot, and dashboard screens using proprietary engine. Proposed optimization solutions based on high-definition film-level design drafts, designed weather, lighting, atmosphere effects and transition effects, troubleshooted and solved model wiring issues. Established model production standards and art workflows for car systems."
      },
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/4E6MJUzwTOCpwebhNyQiaiheH4O8Mgw6/BYDbao8.jpg"
      ],
      videos: [],
      tech: ["Proprietary Engine", "3D Effects", "Car System", "Optimization", "Workflow"],
      links: {
      },
      stars: 0,
      featured: true,
      date: "2023-06-01"
    },
    {
      id: "proj-7",
      title: {
        zh: "AI数字医生 - 复旦大学附属中山医院",
        en: "AI Digital Doctor - Fudan University Zhongshan Hospital"
      },
      description: {
        zh: "医院在大厅部署交互大屏供就诊或来访者提供AI数字人语音服务，同时在医院病房的查房机器人上部署该服务。项目交付3个写实数字人模型，每个数字人模型提供两种不同的精度（共6个模型文件）、及5种动作，52个标准表情和1张背景图片。帮助医院提升就诊体验和工作效率。",
        en: "Hospital deployed interactive screens in lobby for AI digital human voice services for patients and visitors, also deployed on ward round robots in hospital rooms. Project delivered 3 realistic digital human models, each providing two different precision levels (6 model files total), 5 actions, 52 standard expressions and 1 background image. Helped hospital improve patient experience and work efficiency."
      },
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/bdKKUF3gs2ikpnSGUWkAVBDQ3rfYKzCb/hospitaldoctor.jpg"
      ],
      videos: [],
      tech: ["AI Digital Human", "3D Modeling", "Medical Technology", "Voice Service", "Hospital"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2023-12-01"
    },
    {
      id: "proj-8",
      title: {
        zh: "智能体中台和商城",
        en: "AI Agent Platform and Marketplace"
      },
      description: {
        zh: "负责产品功能设计和前端开发，功能包括成员权限管理，AI对话，报表生成，SSO，应用切换，模型切换，前端界面编排。",
        en: "Responsible for product feature design and frontend development, including member permission management, AI dialogue, report generation, SSO, application switching, model switching, frontend interface orchestration."
      },
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/Slu1LJj5qxhDQ6YUTmqs2afK4r0dGAoM/avamarket-2.jpg",
        "http://lc-KPCSue6i.cn-n1.lcfile.com/7keBhYx7mh8rsyflO4p2Chyby67CeSl7/avaca11.png",
        "http://lc-KPCSue6i.cn-n1.lcfile.com/NzwqwqRXiGXtsEvwj9PRjHI4dHB6Pk5z/avaca22.png"
      ],
      tech: ["Frontend Development", "AI Platform", "Permission Management", "SSO", "UI Orchestration"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2024-08-01"
    },
    {
      id: "proj-9",
      title: {
        zh: "校园数字孪生平台开发",
        en: "Campus Digital Twin Platform Development"
      },
      description: {
        zh: "基于Unreal Engine 5开发的校园数字孪生平台，提供沉浸式的校园体验和交互功能。",
        en: "Campus digital twin platform developed based on Unreal Engine 5, providing immersive campus experience and interactive features."
      },
      videos: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/FunUsk12T78FNmiyw32u4xmKM2mTOYv6/schoolunreal.mp4"
      ],
      tech: ["Unreal Engine 5", "Digital Twin", "Campus", "Immersive Experience"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2024-09-01"
    },
    {
      id: "proj-10",
      title: {
        zh: "UE汽车交互体验",
        en: "UE Car Interaction Experience"
      },
      description: {
        zh: "与梅赛德斯公司长期合作调研，提供一整套G-Box选购的硬件+界面交互解决方案。",
        en: "Long-term cooperation research with Mercedes-Benz, providing a complete G-Box selection hardware + interface interaction solution."
      },
      videos: ["http://lc-KPCSue6i.cn-n1.lcfile.com/olCaaEQCbRzRApDqFOwb88foKO9sVGqY/MercedesUEVideo.mp4"],
      tech: ["Unreal Engine", "Car Interaction", "Mercedes-Benz", "Hardware Integration"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2024-07-01"
    },
    {
      id: "proj-11",
      title: {
        zh: "数字孪生交互渲染混剪",
        en: "Digital Twin Interaction Rendering Reel"
      },
      description: {
        zh: "数字孪生交互渲染混剪",
        en: "Digital Twin Interaction Rendering Reel"
      },
      videos: ["http://lc-KPCSue6i.cn-n1.lcfile.com/e7uM7Ln43tuNLoqwh5d4I09rjlEohYy7/raydata_smartcityPortfolio.mp4"],
      tech: ["Tencent Cloud", "Raydata", "Digital Twin", "Technical Artist", "Realtime"],
      links: {
      },
      stars: 0,
      featured: true,
      date: "2024-06-01"
    },
    {
      id: "proj-12",
      title: {
        zh: "项目工时管理系统",
        en: "Project Time Management System"
      },
      description: {
        zh: "开发一个项目工时管理系统，用于项目数据预览、工时填报、工时审批等。独立编写项目管理平台需求规格说明书，开发任务排期，优先级管理，相关方需求沟通与落地。独立编写项目管理平台使用手册。",
        en: "Developed a project time management system for project data preview, time reporting, time approval, etc. Independently wrote project management platform requirements specification, developed task scheduling, priority management, and related party needs communication and implementation. Independently wrote project management platform user manual."
      },
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/QnACYHqJDEFLbJHQse9jsHHJYWKisw7b/ResourceManageTool.jpg",
        "http://lc-KPCSue6i.cn-n1.lcfile.com/gK4I6FKTEPs7Swgb50WpLJfkspImSiVr/ResourceManageTool1.jpg"
      ],
      videos: [],
      tech: ["GritWorld", "Product Management", "Product Design"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2024-06-01"
    },
    {
      id: "proj-13",
      title: {
        zh: "鬼刀手机游戏",
        en: "Ghost Blade Mobile Game"
      },
      description: {
        zh: "在引擎中搭建场景，将所有影视级资产处理成手游级别资产，并适配游戏中的换装、地图切换、天气系统功能。",
        en: "Built scenes in engine, processed all film-level assets into mobile game assets, and adapted the dressing, map switching, weather system functions in the game."
      },
      videos: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/GInIHlabBLPJxaz9yxaqqu6rNJRjytuG/ghostbladeVideo.mp4",
        "http://lc-KPCSue6i.cn-n1.lcfile.com/lfd9trtjlHn12Up8dvU8Yflj87EVas3y/fireDragonLowlolyVideo.mp4"
      ],
      images: [
        "http://lc-KPCSue6i.cn-n1.lcfile.com/gfFXfgR6T7t5dRwKeopXIXbDaIHYqLKQ/ghostblade.jpg",
      ],
      tech: ["GritWorld", "Game Development", "Mobile Game", "ARPG"],
      links: {
      },
      stars: 0,
      featured: false,
      date: "2023-03-01"
    }
  ],

  // Contact Information
  contact: {
    email: "bingru.li24@student.xjtlu.edu.cn",
    phone: "+86 18080637660",
    github: "https://github.com/LiBinZyu",
    linkedin: "https://www.linkedin.com/in/robbingruli",
    wechat: "LiBinZyu"
  },

  // Footer Information
  footer: {
    lastUpdated: "2024-12-20",
    location: {
      zh: "中国苏州",
      en: "Suzhou, China"
    }
  },

  // Site Configuration
  config: {
    defaultLanguage: "zh",
    defaultTheme: "light",
    enableAnalytics: true,
    enableStarTracking: true
  }
};

// Image hosting services configuration
// 图片托管服务配置
const imageHosting = {
  // Using Unsplash for placeholder images
  // 使用Unsplash作为占位图片
  unsplash: {
    baseUrl: "https://images.unsplash.com",
    categories: {
      technology: "photo-1551288049-bebda4e38f71",
      business: "photo-1556742049-0cfed4f6a45d",
      communication: "photo-1577563908411-5077b6dc7624",
      mobile: "photo-1512941937669-90a1b58e7e9c",
      network: "photo-1558494949-ef010cbdcc31"
    }
  },
  
  // Alternative hosting services
  // 替代托管服务
  alternatives: {
    // Cloudinary (free tier available)
    cloudinary: {
      baseUrl: "https://res.cloudinary.com/your-cloud-name/image/upload",
      transformations: "w_400,h_200,c_fill,q_auto,f_auto"
    },
    
    // Imgur (free)
    imgur: {
      baseUrl: "https://i.imgur.com"
    },
    
    // GitHub (for project images)
    github: {
      baseUrl: "https://raw.githubusercontent.com/LiBinZyu/LiBinZyu.github.io/main/assets/images"
    }
  }
};

// Video hosting services configuration
// 视频托管服务配置
const videoHosting = {
  // YouTube (free, unlimited)
  youtube: {
    baseUrl: "https://www.youtube.com/embed",
    thumbnailUrl: "https://img.youtube.com/vi/{videoId}/maxresdefault.jpg"
  },
  
  // Vimeo (free tier available)
  vimeo: {
    baseUrl: "https://player.vimeo.com/video",
    thumbnailUrl: "https://vumbnail.com/{videoId}.jpg"
  },
  
  // Cloudinary (for video hosting)
  cloudinary: {
    baseUrl: "https://res.cloudinary.com/your-cloud-name/video/upload",
    transformations: "w_800,h_auto,q_auto,f_auto"
  }
};

// Export data for use in other files
// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    portfolioData,
    imageHosting,
    videoHosting
  };
}
