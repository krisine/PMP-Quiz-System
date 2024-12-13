export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
}

export async function loadQuestions(): Promise<Question[]> {
  // 在实际应用中,这里应该是一个fetch请求来获取JSON文件
  // 为了演示,我们直接返回一个包含问题的数组
  return [
    {
      id: 1,
      question: "这幅图片中展示的是哪种编程语言的logo?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correctAnswer: "JavaScript",
      explanation: "这是JavaScript的官方logo,由一个黄色的JS缩写组成,背景为黑色。",
      imageUrl: "/placeholder.svg?height=200&width=300&text=JS"
    },
    {
      id: 2,
      question: "在JavaScript中,哪个方法用于向数组的末尾添加一个或多个元素?",
      options: ["push()", "append()", "addToEnd()", "insert()"],
      correctAnswer: "push()",
      explanation: "push()方法用于向数组的末尾添加一个或多个元素,并返回新的数组长度。"
    },
    {
      id: 3,
      question: "这个图片展示的是哪种数据结构?",
      options: ["数组", "链表", "二叉树", "图"],
      correctAnswer: "二叉树",
      explanation: "图中展示的是一个二叉树结构,每个节点最多有两个子节点。",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Binary+Tree"
    },
    {
      id: 4,
      question: "什么是REST API?",
      options: [
        "一种编程语言",
        "一种数据库系统",
        "一种软件架构风格",
        "一种操作系统"
      ],
      correctAnswer: "一种软件架构风格",
      explanation: "REST (Representational State Transfer) 是一种软件架构风格,用于设计网络应用程序。它使用HTTP请求来进行CRUD (创建、读取、更新、删除) 操作。"
    }
  ];
}

