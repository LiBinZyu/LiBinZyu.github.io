const label = (zh, en) => ({ zh, en });

const portfolioData = {
  profile: {
    name: label("李炳儒", "Bingru Li"),
    role: label("软件工程师 · 计算机图形学与交互系统", "Software Engineer — Computer Graphics and Interactive Systems"),
    bio: label(
      "我是一名专注于计算机图形学与交互系统的软件工程师，主要使用 C#、C++、Python，基于 Unity、Unreal Engine 及自研引擎开发实时三维应用、机器人遥操作、智能座舱与多模态交互系统。我关注计算机图形学、人工智能与新兴计算平台的融合，致力于设计和实现面向未来先进技术的解决方案。",
      "I’m a software engineer specializing in computer graphics and interactive systems. I primarily work with C#, C++, and Python across Unity, Unreal Engine, and proprietary engines to build real-time 3D applications, robot teleoperation tools, digital cockpits, and multimodal systems. I’m interested in how computer graphics, artificial intelligence, and emerging computing platforms can come together, and I aim to turn those advances into practical solutions for the next generation of technology."
    ),
    image: "assets/images/profile_life.png",
    cvUrl: "assets/BingruLi_Resume_bilingual.pdf"
  },

  categories: {
    "all": label("全部", "All"),
    "spatial-xr": label("空间计算", "XR"),
    "3d-tech-art": label("3D", "3D"),
    "ai-software": label("AI", "AI"),
    "research": label("学术研究", "Research")
  },

  projects: [
    {
      id: "proj-1",
      category: "spatial-xr",
      title: label("天机机器人：全身机器人遥操作与具身数据采集", "TIANJI — Full-Body Robot Teleoperation and Embodied Data Collection"),
      description: label(
        "基于 Unity 和 OpenXR 实现全身机器人遥操作，并开发包管理工具处理不同头显厂商的 SDK 差异。应用同步采集第一视角场景和交互数据。",
        "Built a Unity and OpenXR application for full-body robot teleoperation. A package management tool handles differences between headset SDKs, and the application records first-person scene and interaction data."
      ),
      images: ["assets/images/teleop_cover.jpg", "assets/images/teleop_quest.jpg", "assets/images/teleop_teleop.jpeg"],
      tech: ["Unity", "OpenXR", label("全身遥操作", "Full-Body Teleoperation"), label("SDK 包管理", "SDK Package Management"), label("具身数据采集", "Embodied Data Collection")],
      date: "2026-04-01"
    },
    {
      id: "proj-2",
      category: ["ai-software","research"],
      title: label("VAI：Unity 语音控制插件", "VAI — Voice Control Plugin for Unity"),
      description: label(
        "开发 Unity 插件，将唤醒词检测、自动语音识别和大语言模型工具调用接入同一流程，把自然语言指令映射为 Unity 函数调用。本地自然语言理解模块处理常见指令，减少模型调用。",
        "Developed a Unity plugin that connects wake-word detection, automatic speech recognition, and LLM tool calling to turn spoken commands into Unity function calls. An on-device language understanding module handles common commands and reduces LLM calls."
      ),
      videos: ["assets/videos/VAIdemoVideo.mp4"],
      poster: "assets/images/VAIcover.jpg",
      tech: ["Unity", "C#", label("唤醒词检测", "Wake-Word Detection"), label("语音识别", "Speech Recognition"), label("本地自然语言理解", "On-Device NLU"), label("大模型工具调用", "LLM Tool Calling")],
      links: { github: "https://github.com/LiBinZyu/VAI" },
      date: "2025-03-01"
    },
    {
      id: "proj-3",
      category: "3d-tech-art",
      title: label("CameraArrayTools：Unreal Engine 5 相机阵列与批量渲染", "CameraArrayTools — Camera Arrays and Batch Rendering in Unreal Engine 5"),
      description: label(
        "开发 UE5 插件，用统一面板生成和管理相机阵列，向 Movie Render Queue 提交批量渲染任务，并监控路径追踪渲染耗时。",
        "Developed a UE5 plugin that generates and manages camera arrays from a single panel, submits batch jobs to Movie Render Queue, and tracks path-tracing render times."
      ),
      videos: ["assets/videos/CameraArrayToolsVideo.mp4"],
      poster: "assets/images/CameraArrayTools.jpg",
      tech: ["Unreal Engine 5", "C++", "Python", "Movie Render Queue", label("路径追踪", "Path Tracing")],
      links: { github: "https://github.com/LiBinZyu/CameraArrayTools" },
      date: "2025-07-01"
    },
    {
      id: "proj-4",
      category: ["spatial-xr","research"],
      title: label("混合现实人体解剖交互系统", "Interactive Anatomy in Mixed Reality"),
      description: label(
        "在 Unity 和 Meta Quest 3 上实现手势交互，支持查看肌肉、内脏、骨骼等 8 类人体结构，包含 50 个模型。通过对照实验比较混合现实、计算机辅助和传统学习方式在知识记忆、任务表现和用户体验上的差异。",
        "Built a hand-tracked anatomy application in Unity for Meta Quest 3, with 50 models across eight categories including muscles, organs, and bones. A comparative study examined retention, task performance, and user experience across mixed reality, computer-assisted learning, and conventional methods."
      ),
      videos: ["assets/videos/Anatomy_ISMAR2025.mp4"],
      poster: "assets/previews/proj-4.webp",
      tech: ["Unity", "Meta Quest 3", "Meta XR SDK", label("手部追踪", "Hand Tracking"), label("解剖可视化", "Anatomy Visualization")],
      links: { paper: "https://dl.acm.org/doi/10.1145/3757372.3771850" },
      date: "2024-11-01"
    },
    {
      id: "proj-5",
      category: ["spatial-xr","research"],
      title: label("RescueReality：混合现实心肺复苏引导原型", "RescueReality — Mixed Reality CPR Guidance Prototype"),
      description: label(
        "使用 Unity 和 Meta Quest 3 实现混合现实原型，为未经急救培训的用户提供分步骤心肺复苏提示。研究关注引导的可用性、任务表现和认知负荷。",
        "Built a Unity prototype for Meta Quest 3 that presents step-by-step CPR prompts to users without first-aid training. The study focused on usability, task performance, and cognitive workload."
      ),
      images: ["assets/images/CPR1.jpg", "assets/images/CPR2.jpg"],
      tech: ["Unity", "Meta Quest 3", label("混合现实", "Mixed Reality"), label("人机交互", "Human–Computer Interaction"), label("可用性评估", "Usability Evaluation")],
      date: "2024-10-01"
    },
    {
      id: "proj-6",
      category: "spatial-xr",
      title: label("MR Creator：移动端混合现实编辑器", "MR Creator — Mobile Mixed Reality Authoring Tool"),
      description: label(
        "构建面向手机和平板的混合现实内容编辑器，支持在同一空间中配置游戏和语音对话等交互。使用视觉定位系统（VPS）在大范围地图中定位内容，并对齐关键位置。",
        "Built a mixed reality authoring tool for phones and tablets that lets creators configure interactions such as games and voice dialogue in a shared space. A visual positioning system (VPS) places content across large maps and aligns it with key locations."
      ),
      images: ["assets/images/MRcreator.jpg"],
      tech: [label("混合现实", "Mixed Reality"), label("视觉定位", "Visual Positioning"), "SLAM", label("移动端开发", "Mobile Development"), label("空间内容编辑", "Spatial Authoring")],
      date: "2023-12-01"
    },
    {
      id: "proj-7",
      category: "3d-tech-art",
      title: label("方程豹豹 8：智能座舱实时三维渲染", "Fangchengbao Bao 8 — Real-Time 3D Rendering for the Cockpit"),
      description: label(
        "使用自研引擎为中控屏、副驾驶屏和仪表盘开发实时三维场景。实现天气、光照和转场效果，优化场景资产，排查网格拓扑问题，并整理车机模型规范与资产流程。",
        "Developed real-time 3D scenes for the center display, passenger display, and instrument cluster in a proprietary engine. Implemented weather, lighting, and transitions, optimized scene assets, resolved mesh topology issues, and documented asset standards for the cockpit."
      ),
      images: ["assets/images/BYDbao8.jpg"],
      tech: [label("自研引擎", "Proprietary Engine"), label("智能座舱", "Digital Cockpit"), label("实时渲染", "Real-Time Rendering"), label("网格优化", "Mesh Optimization"), label("资产管线", "Asset Pipeline")],
      date: "2023-06-01"
    },
    {
      id: "proj-8",
      category: "ai-software",
      title: label("中山医院：数字人语音交互", "Voice-Interactive Digital Humans for Zhongshan Hospital"),
      description: label(
        "为复旦大学附属中山医院的大厅交互屏和查房机器人制作语音交互数字人资产。交付三个角色，每个角色提供两档模型精度，并配套五种动作和 52 个标准表情。",
        "Produced digital human assets for voice interactions on lobby displays and ward-round robots at Zhongshan Hospital, Fudan University. Delivered three characters at two levels of detail each, along with five animations and 52 standard facial expressions."
      ),
      images: ["assets/images/hospitaldoctor.jpg"],
      tech: [label("数字人", "Digital Humans"), label("细节层级（LOD）", "Levels of Detail (LOD)"), label("面部表情", "Facial Expressions"), label("语音交互", "Voice Interaction")],
      date: "2023-12-01"
    },
    {
      id: "proj-9",
      category: "ai-software",
      title: label("智能体管理平台与应用商城", "AI Agent Management Platform and App Marketplace"),
      description: label(
        "开发智能体平台与应用商城的前端，集成单点登录、成员权限、对话、报表生成、应用与模型切换，以及页面配置。",
        "Developed the frontend for an AI agent platform and app marketplace, integrating single sign-on, member permissions, chat, report generation, app and model switching, and configurable page layouts."
      ),
      images: ["assets/images/avamarket-2.jpg", "assets/images/avaca11.png", "assets/images/avaca22.png"],
      tech: [label("前端开发", "Frontend Development"), label("智能体平台", "AI Agent Platform"), label("单点登录（SSO）", "Single Sign-On (SSO)"), label("访问控制", "Access Control"), label("报表生成", "Report Generation")],
      date: "2024-08-01"
    },
    {
      id: "proj-10",
      category: "3d-tech-art",
      title: label("Unreal Engine 5 校园数字孪生", "Campus Digital Twin in Unreal Engine 5"),
      description: label(
        "使用 Unreal Engine 5 构建可交互的三维校园场景，将实时渲染与校园场景浏览集成在同一应用中。",
        "Built an interactive 3D campus in Unreal Engine 5, combining real-time rendering with navigation through the campus scene."
      ),
      videos: ["assets/videos/SmartSchoolUE5.mp4"],
      poster: "assets/previews/proj-10.webp",
      tech: ["Unreal Engine 5", label("数字孪生", "Digital Twins"), label("实时渲染", "Real-Time Rendering"), label("三维场景交互", "3D Scene Interaction")],
      date: "2024-09-01"
    },
    {
      id: "proj-11",
      category: "3d-tech-art",
      title: label("梅赛德斯-奔驰 G-Box 选购交互原型", "Mercedes-Benz G-Box Selection Prototype"),
      description: label(
        "与梅赛德斯-奔驰合作研究 G-Box 的选购流程，使用 Unreal Engine 原型验证硬件与界面的交互方式。",
        "Worked with Mercedes-Benz to research the G-Box selection workflow and used an Unreal Engine prototype to evaluate how the hardware and on-screen interface worked together."
      ),
      videos: ["assets/videos/MercedesUEVideo.mp4"],
      poster: "assets/images/UEmercedes.jpg",
      tech: ["Unreal Engine", label("软硬件集成", "Hardware Integration"), label("交互原型", "Interaction Prototyping")],
      date: "2024-07-01"
    },
    {
      id: "proj-12",
      category: "3d-tech-art",
      title: label("Raydata 数字孪生实时渲染案例", "Real-Time Rendering for Raydata Digital Twins"),
      description: label(
        "整理腾讯云 Raydata 数字孪生项目中的实时三维渲染案例，展示场景渲染、特效和交互可视化在项目中的应用。",
        "A collection of real-time 3D work from Tencent Cloud Raydata digital twins, covering scene rendering, visual effects, and interactive visualization."
      ),
      videos: ["assets/videos/Raydata.mp4"],
      poster: "assets/images/raydata.jpg",
      tech: ["Raydata", label("数字孪生", "Digital Twins"), label("实时渲染", "Real-Time Rendering"), label("三维可视化", "3D Visualization"), label("实时特效", "Real-Time VFX")],
      date: "2024-06-01"
    },
    {
      id: "proj-13",
      category: "ai-software",
      title: label("项目工时填报与审批系统", "Project Timesheet and Approval System"),
      description: label(
        "开发项目数据查看、工时填报和审批功能，编写需求规格与使用文档，并负责确定开发优先级和任务排期。",
        "Developed project data views, timesheet submission, and approval workflows. Wrote the requirements and user documentation and managed implementation priorities and scheduling."
      ),
      images: ["assets/images/ResourceManageTool.jpg", "assets/images/ResourceManageTool1.jpg"],
      tech: [label("工时管理", "Time Tracking"), label("审批流程", "Approval Workflows"), label("需求规格", "Requirements Specifications")],
      date: "2024-06-01"
    },
    {
      id: "proj-14",
      category: "3d-tech-art",
      title: label("《鬼刀》手游场景与资产优化", "Scene and Asset Optimization for Ghost Blade Mobile"),
      description: label(
        "在引擎中搭建手游场景，将影视级源资产转换为适合移动端实时渲染的资产，并适配角色换装、场景切换和天气系统。",
        "Assembled scenes in-engine, adapted film-quality source assets for real-time rendering on mobile, and integrated them with character outfit changes, scene transitions, and the weather system."
      ),
      images: ["assets/images/ghostblade.jpg"],
      videos: ["assets/videos/ghostbladeVideo.mp4"],
      tech: [label("移动端渲染", "Mobile Rendering"), label("资产优化", "Asset Optimization"), label("场景集成", "Scene Integration"), label("天气系统", "Weather Systems")],
      date: "2023-03-01"
    },
    {
      id: "proj-15",
      category: "3d-tech-art",
      title: label("Blender 插件：3D 高斯泼溅转油画风格网格", "Blender Add-on — Oil-Painted Meshes from 3D Gaussian Splats"),
      description: label(
        "开发 Blender 插件，使用自定义几何节点重建 3D 高斯泼溅数据，以查找表（LUT）烘焙颜色和笔触纹理，生成可导出为 FBX、OBJ 或 GLB 的轻量网格。",
        "Developed a Blender add-on that reconstructs 3D Gaussian splats with custom Geometry Nodes and uses a lookup table to bake color and brushstroke textures. The lightweight meshes export as FBX, OBJ, or GLB."
      ),
      images: ["assets/images/3dgs-to-mesh_1.jpg", "assets/images/3dgs-to-mesh_2.jpg"],
      tech: ["Blender", "Python", label("3D 高斯泼溅（3DGS）", "3D Gaussian Splatting (3DGS)"), label("几何节点", "Geometry Nodes"), label("纹理烘焙", "Texture Baking"), label("非真实感渲染", "Non-Photorealistic Rendering")],
      links: { github: "https://github.com/LiBinZyu/blender-3dgs-oil-paint" },
      date: "2026-03-01"
    },
    {
      id: "proj-16",
      category: ["spatial-xr","research"],
      title: label("Unified Teleop XR: Open-source toolkit", "Unified Teleop XR: Open-source toolkit"),
      description: label(
        "开发 Unity 工具包，通过 OpenXR 读取姿态、速度和交互输入，经 Cyclone DDS 发布到 ROS 2 话题。实现追踪丢失、异常运动和动作范围限制的处理逻辑，并用 GPU 计算着色器从空间视频重建点云与网格。",
        "Developed a Unity toolkit that reads pose, velocity, and interaction input through OpenXR and publishes it to ROS 2 topics through Cyclone DDS. It handles tracking loss and abnormal motion, enforces motion limits, and reconstructs point clouds and meshes from spatial video with GPU compute shaders."
      ),
      images: ["assets/images/UTXR.jpg"],
      videos: ["assets/videos/UTXR-show.mp4"],
      tech: ["Unity", "OpenXR", "ROS 2", "Cyclone DDS", label("机器人遥操作", "Robot Teleoperation"), label("计算着色器", "Compute Shaders"), label("空间视频重建", "Spatial Video Reconstruction")],
      links: { github: "https://github.com/LiBinZyu/unified-teleop-xr" },
      date: "2026-10-01"
    }
  ],

  blogs: [
    {
      id: "blog-1",
      title: label("XR 技术入门：概念、演进与应用", "XR Fundamentals — Concepts, History, and Applications"),
      description: label("梳理 XR 的基本概念和发展脉络，介绍虚拟现实、增强现实和混合现实的区别及应用场景。", "An introduction to the history of XR, the differences between virtual, augmented, and mixed reality, and where each is used."),
      date: "2025-10-10",
      link: "https://libinzyu.github.io/unity-xr-guide/#/doc/xr-overview",
      image: "assets/images/blog_xroverview.jpg"
    },
    {
      id: "blog-2",
      title: label("用 XR 实现机器人遥操作", "Robot Teleoperation with XR"),
      description: label("从 XR 头显出发，介绍机器人遥操作中的姿态同步、实时网络传输、空间视频回传和跨平台部署。", "An overview of XR robot teleoperation, covering pose synchronization, real-time networking, spatial video streaming, and cross-platform deployment."),
      date: "2026-04-20",
      link: label("https://libinzyu.github.io/unity-xr-guide/#/doc/teleoperation_cn", "https://libinzyu.github.io/unity-xr-guide/#/doc/teleoperation"),
      image: "assets/images/blog_robot_teleop.jpg"
    },
    {
      id: "blog-3",
      title: label("Unity 入门：游戏对象、组件与脚本", "Unity Fundamentals — GameObjects, Components, and Scripting"),
      description: label("介绍 Unity 编辑器、游戏对象与组件，并演示如何使用 MonoBehaviour 处理输入和基础物理交互。", "An introduction to the Unity Editor, GameObjects, and components, with examples of MonoBehaviour scripting for input and basic physics interactions."),
      date: "2025-10-15",
      link: "https://libinzyu.github.io/unity-xr-guide/#/doc/unity-basics",
      image: "assets/images/blog_unity_basics.jpg"
    },
    {
      id: "blog-4",
      title: label("OpenXR 与空间交互设计基础", "OpenXR and Spatial Interaction Fundamentals"),
      description: label("介绍 OpenXR、常见空间交互方式和相关开发工具，为选择 XR 输入和交互方式提供背景。", "An overview of OpenXR, common spatial interaction techniques, and development tools for choosing how users interact with XR applications."),
      date: "2025-10-20",
      link: "https://libinzyu.github.io/unity-xr-guide/#/doc/openxr",
      image: "assets/images/blog_openxr.jpg"
    },
    {
      id: "blog-5",
      title: label("在 Unity 中配置 Meta XR SDK", "Setting Up the Meta XR SDK in Unity"),
      description: label("介绍如何安装 Meta XR SDK、配置 Unity 项目，并在 Meta Quest 上运行第一个 XR 示例。", "A guide to installing the Meta XR SDK, configuring a Unity project, and running your first XR example on Meta Quest."),
      date: "2025-10-25",
      link: "https://libinzyu.github.io/unity-xr-guide/#/doc/helloworld",
      image: "assets/images/blog_meta_sdk.jpg"
    }
  ],

  experiences: [
    {
      id: "exp-1",
      category: label("教育经历", "EDUCATION"),
      title: label("人机交互，全日制硕士研究生", "Master of Science in Human-Computer Interaction with distinction"),
      company: label("西交利物浦大学", "University of Liverpool"),
      period: label("2024年9月 - 2026年3月", "September 2024 - March 2026"),
      link: label("https://www.xjtlu.edu.cn", "https://www.liverpool.ac.uk"),
      description: label("成绩: Distinction. 核心课程：数据可视化、机器学习、数据挖掘 and 分析、人工智能、人机交互", "Core courses: Data Visualization, Machine Learning, Data Mining and Analysis, Artificial Intelligence, Human-Computer Interaction"),
      tags: ["Research", "XR", "Data Visualization", "Machine Learning", "AI", "HCI"]
    },
    {
      id: "exp-2",
      category: label("教育经历", "EDUCATION"),
      title: label("数字媒体技术，全日制统招本科", "Bachelor's Degree in Digital Media Technology"),
      company: label("成都大学", "Chengdu University"),
      period: label("2016年9月 - 2020年6月", "September 2016 - June 2020"),
      link: label("https://www.cdu.edu.cn", "https://en.wikipedia.org/wiki/Chengdu_University"),
      description: label("成绩：86/100。核心课程：C语言、C++、数据结构与算法、计算机图形学、游戏开发基础、数字媒体技术基础、虚拟现实、3D建模技术、数字媒体艺术基础、平面设计、网页开发技术等", "GPA: 86/100. Core courses: C Language, C++, Data Structures and Algorithms, Computer Graphics, Game Development Fundamentals, Digital Media Technology, Virtual Reality, 3D Modeling, Digital Media Art, Graphic Design, Web Development"),
      tags: ["C/C++", "Computer Graphics", "Game Development", "3D Modeling", "VR", "Web Development"]
    },
    {
      id: "exp-3",
      category: label("工作经历", "EXPERIENCE"),
      title: label("技术美术", "Technical Artist"),
      company: label("粒界科技", "GritWorld Technology"),
      period: label("2021年7月 - 2024年3月", "July 2021 - March 2024"),
      link: label("https://www.gritworld.com.cn", "https://www.gritworld.com"),
      description: label("作为技术美术开发XR、移动端游戏优化、BYD方程豹8车机，个人编写4个专利，联合申请6个软著。基于自研引擎开发AR、车机等解决方案。", "As Technical Artist developed XR, mobile game optimization, BYD Fangchengbao 8 car system. Personally wrote 4 patents and jointly applied for 6 software copyrights. Developed AR and car system solutions based on proprietary engine."),
      tags: ["XR", "AR", "Rendering", "Car", "Game Engine", "OpenGL", "Project Management"]
    },
    {
      id: "exp-4",
      category: label("工作经历", "EXPERIENCE"),
      title: label("技术美术", "Technical Artist"),
      company: label("腾讯云", "Tencent Cloud"),
      period: label("2020年9月 - 2021年3月", "September 2020 - March 2021"),
      link: label("https://cloud.tencent.com", "https://intl.cloud.tencent.com"),
      description: label("3D特效和模型开发，使用自研引擎、Unity、Unreal Engine以及DCC工具进行项目开发。设计公司内部资产库规范，维护美术工作流程，保证资产质量。主导了上海地铁后台大屏、宝龙地产大屏、北京大兴机场等智慧城市项目，使用自研引擎进行特效渲染，开发地理信息蓝图工具，成功完成1600W项目开发。", "3D effects and model development using proprietary engine, Unity, Unreal Engine and DCC tools. Designed internal asset library standards, maintained art workflows, ensured asset quality. Led smart city projects including Shanghai Metro backend screen, Powerlong Real Estate screen, Beijing Daxing Airport, using proprietary engine for effect rendering and developing geographic information blueprint tools, successfully completed 16M project development."),
      tags: ["Effects", "Unity", "Unreal Engine", "Game Engine", "Asset Pipeline"]
    },
    {
      id: "exp-8-paper",
      category: label("论文", "PUBLICATIONS"),
      description: "<strong>Bingru Li</strong>, Yiming Luo, Jialin Wang, Nan Xiang, Yushan Pan, Hao Wang, Junjun Pan, and Zhijie Xu. 2025. <strong>Advancing Anatomy Outreach: A Systematic Comparative Study of Mixed Reality, Computer-assisted, and Conventional Methods</strong>. In <em>SIGGRAPH Asia 2025 Educator's Forum (SA '25)</em>. Association for Computing Machinery, New York, NY, USA, Article 2, 1–8. <a href='https://doi.org/10.1145/3757372.3771850' target='_blank' rel='noopener' class='exp-link'>[DOI]</a>",
      tags: []
    },
    {
      id: "exp-8-paper-2",
      category: label("论文", "PUBLICATIONS"),
      description: "<strong>Bingru Li</strong>, Jier Zhang, Yiming Luo, Jialin Wang, Zhao Wang, Yushan Pan, Nan Xiang, and Zhijie Xu. 2025. <strong>VAI-Med: Synergistic Voice and Gesture Multimodal Interaction for Medical Education</strong>. In <em>Computer Graphics International (CGI)</em>, Accepted.",
      tags: []
    },
    {
      id: "exp-8-patents",
      category: label("发明专利", "PATENTS"),
      description: label("专利：气象数据处理方法、装置、存储介质及设备，2024\n专利：房屋立体模型显示方法、装置、介质及设备，2023\n专利：地形绘制方法、装置、存储介质及设备，2022", "Patent: Meteorological Data Processing Method, Apparatus, Storage Medium, and Device, 2024\nPatent: 3D House Model Display Method, Apparatus, Medium, and Device, 2023\nPatent: Terrain Rendering Method, Apparatus, Storage Medium, and Device, 2022"),
      tags: []
    },
    {
      id: "exp-8-certs",
      category: label("证书", "CERTIFICATIONS"),
      description: label("PMP 项目管理专业人士认证 (Project Management Professional), 2023\nProfessional Scrum Master (PSM I) 敏捷资质认证, 2023", "PMP Project Management Professional Certificate, 2023\nProfessional Scrum Master (PSM I) Certificate, 2023"),
      tags: []
    }
  ],

  contact: [
    { title: label("电子邮箱", "Email"), text: "rob.bingru.li@outlook.com" },
    { title: label("联系电话", "Phone"), text: "+86 18080637660" },
    { title: label("微信", "WeChat"), text: "LiBinZyu" },
    { title: label("GitHub", "GitHub"), text: "github.com/LiBinZyu", link: "https://github.com/LiBinZyu" },
    { title: label("LinkedIn", "LinkedIn"), text: "linkedin.com/in/robbingruli", link: "https://www.linkedin.com/in/robbingruli" }
  ]
};

module.exports = { portfolioData };
