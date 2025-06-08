import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Download, Plus, Trash2, Moon, Sun, Palette, Eye, Code, Github, ExternalLink, Mail, Phone, Linkedin, Globe } from 'lucide-react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    skills: [],
    projects: [],
    contact: {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      website: ''
    },
    themeColor: '#3b82f6'
  })
  
  const [newSkill, setNewSkill] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    demoUrl: ''
  })

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      setPortfolioData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever portfolioData changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
  }, [portfolioData])

  const updatePortfolioData = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateContactData = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
      updatePortfolioData('skills', [...portfolioData.skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    updatePortfolioData('skills', portfolioData.skills.filter(skill => skill !== skillToRemove))
  }

  const addProject = () => {
    if (newProject.title.trim()) {
      updatePortfolioData('projects', [...portfolioData.projects, { ...newProject, id: Date.now() }])
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        demoUrl: ''
      })
    }
  }

  const removeProject = (projectId) => {
    updatePortfolioData('projects', portfolioData.projects.filter(project => project.id !== projectId))
  }

  const generatePortfolioHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.name} - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .portfolio {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            background: linear-gradient(135deg, ${portfolioData.themeColor}, ${portfolioData.themeColor}dd);
            color: white;
            padding: 60px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid rgba(255,255,255,0.3);
            margin: 0 auto 20px;
            object-fit: cover;
            position: relative;
            z-index: 1;
        }
        
        .name {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        
        .title {
            font-size: 1.5rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: ${portfolioData.themeColor};
            position: relative;
            padding-bottom: 10px;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: ${portfolioData.themeColor};
            border-radius: 2px;
        }
        
        .bio {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #666;
        }
        
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .skill {
            background: ${portfolioData.themeColor}20;
            color: ${portfolioData.themeColor};
            padding: 8px 16px;
            border-radius: 25px;
            font-weight: 500;
            border: 2px solid ${portfolioData.themeColor}30;
            transition: all 0.3s ease;
        }
        
        .skill:hover {
            background: ${portfolioData.themeColor};
            color: white;
            transform: translateY(-2px);
        }
        
        .projects {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .project {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            border: 1px solid #e9ecef;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .project::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: ${portfolioData.themeColor};
        }
        
        .project:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        
        .project-description {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .project-tech {
            font-size: 0.9rem;
            color: ${portfolioData.themeColor};
            font-weight: 500;
            margin-bottom: 15px;
        }
        
        .project-links {
            display: flex;
            gap: 10px;
        }
        
        .project-link {
            padding: 8px 16px;
            background: ${portfolioData.themeColor};
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        
        .project-link:hover {
            background: ${portfolioData.themeColor}dd;
            transform: translateY(-1px);
        }
        
        .contact {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
        }
        
        .contact-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        
        .contact-link {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: white;
            color: ${portfolioData.themeColor};
            text-decoration: none;
            border-radius: 10px;
            border: 2px solid ${portfolioData.themeColor}30;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .contact-link:hover {
            background: ${portfolioData.themeColor};
            color: white;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header {
                padding: 40px 20px;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .title {
                font-size: 1.2rem;
            }
            
            .content {
                padding: 20px;
            }
            
            .projects {
                grid-template-columns: 1fr;
            }
            
            .contact-links {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="portfolio">
            <div class="header">
                ${portfolioData.profileImage ? `<img src="${portfolioData.profileImage}" alt="${portfolioData.name}" class="profile-image">` : ''}
                <h1 class="name">${portfolioData.name}</h1>
                <p class="title">${portfolioData.title}</p>
            </div>
            
            <div class="content">
                ${portfolioData.bio ? `
                <div class="section">
                    <h2 class="section-title">About Me</h2>
                    <p class="bio">${portfolioData.bio}</p>
                </div>
                ` : ''}
                
                ${portfolioData.skills.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Skills</h2>
                    <div class="skills">
                        ${portfolioData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${portfolioData.projects.length > 0 ? `
                <div class="section">
                    <h2 class="section-title">Projects</h2>
                    <div class="projects">
                        ${portfolioData.projects.map(project => `
                            <div class="project">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                ${project.technologies ? `<p class="project-tech">Technologies: ${project.technologies}</p>` : ''}
                                <div class="project-links">
                                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank">📁 GitHub</a>` : ''}
                                    ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-link" target="_blank">🚀 Live Demo</a>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="section">
                    <h2 class="section-title">Contact</h2>
                    <div class="contact">
                        <p>Let's connect and work together!</p>
                        <div class="contact-links">
                            ${portfolioData.contact.email ? `<a href="mailto:${portfolioData.contact.email}" class="contact-link">📧 Email</a>` : ''}
                            ${portfolioData.contact.phone ? `<a href="tel:${portfolioData.contact.phone}" class="contact-link">📱 Phone</a>` : ''}
                            ${portfolioData.contact.linkedin ? `<a href="${portfolioData.contact.linkedin}" class="contact-link" target="_blank">💼 LinkedIn</a>` : ''}
                            ${portfolioData.contact.github ? `<a href="${portfolioData.contact.github}" class="contact-link" target="_blank">🐙 GitHub</a>` : ''}
                            ${portfolioData.contact.website ? `<a href="${portfolioData.contact.website}" class="contact-link" target="_blank">🌐 Website</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    
    return html
  }

  const downloadPortfolio = () => {
    const html = generatePortfolioHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${portfolioData.name.replace(/\s+/g, '_').toLowerCase() || 'portfolio'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              One-Minute Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Create your professional portfolio in minutes ⚡
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="h-4 w-4" />
            </div>
            <Button onClick={downloadPortfolio} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Download className="h-4 w-4" />
              Download Portfolio
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Portfolio Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={portfolioData.name}
                        onChange={(e) => updatePortfolioData('name', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={portfolioData.title}
                        onChange={(e) => updatePortfolioData('title', e.target.value)}
                        placeholder="Full Stack Developer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profileImage">Profile Image URL</Label>
                      <Input
                        id="profileImage"
                        value={portfolioData.profileImage}
                        onChange={(e) => updatePortfolioData('profileImage', e.target.value)}
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea
                        id="bio"
                        value={portfolioData.bio}
                        onChange={(e) => updatePortfolioData('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="themeColor" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Theme Color
                      </Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          id="themeColor"
                          value={portfolioData.themeColor}
                          onChange={(e) => updatePortfolioData('themeColor', e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <Input
                          value={portfolioData.themeColor}
                          onChange={(e) => updatePortfolioData('themeColor', e.target.value)}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="newSkill">Add Skill</Label>
                      <div className="flex gap-2">
                        <Input
                          id="newSkill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="React, Node.js, Python..."
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button onClick={addSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="space-y-4 mt-6">
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <h4 className="font-semibold">Add New Project</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectTitle">Project Title</Label>
                        <Input
                          id="projectTitle"
                          value={newProject.title}
                          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="My Awesome Project"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Description</Label>
                        <Textarea
                          id="projectDescription"
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Brief description of your project..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="projectTech">Technologies Used</Label>
                        <Input
                          id="projectTech"
                          value={newProject.technologies}
                          onChange={(e) => setNewProject(prev => ({ ...prev, technologies: e.target.value }))}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="githubUrl" className="flex items-center gap-1">
                            <Github className="h-3 w-3" />
                            GitHub URL
                          </Label>
                          <Input
                            id="githubUrl"
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                            placeholder="https://github.com/..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="demoUrl" className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            Demo URL
                          </Label>
                          <Input
                            id="demoUrl"
                            value={newProject.demoUrl}
                            onChange={(e) => setNewProject(prev => ({ ...prev, demoUrl: e.target.value }))}
                            placeholder="https://demo.com"
                          />
                        </div>
                      </div>
                      
                      <Button onClick={addProject} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {portfolioData.projects.map((project) => (
                        <div key={project.id} className="p-3 border rounded-lg flex justify-between items-start bg-white dark:bg-gray-800">
                          <div>
                            <h5 className="font-semibold">{project.title}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                            {project.technologies && (
                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{project.technologies}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={portfolioData.contact.email}
                        onChange={(e) => updateContactData('email', e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={portfolioData.contact.phone}
                        onChange={(e) => updateContactData('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center gap-1">
                        <Linkedin className="h-3 w-3" />
                        LinkedIn URL
                      </Label>
                      <Input
                        id="linkedin"
                        value={portfolioData.contact.linkedin}
                        onChange={(e) => updateContactData('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center gap-1">
                        <Github className="h-3 w-3" />
                        GitHub URL
                      </Label>
                      <Input
                        id="github"
                        value={portfolioData.contact.github}
                        onChange={(e) => updateContactData('github', e.target.value)}
                        placeholder="https://github.com/johndoe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Personal Website
                      </Label>
                      <Input
                        id="website"
                        value={portfolioData.contact.website}
                        onChange={(e) => updateContactData('website', e.target.value)}
                        placeholder="https://johndoe.com"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border rounded-b-lg overflow-hidden bg-white">
                  <iframe
                    srcDoc={generatePortfolioHTML()}
                    className="w-full h-[600px] border-0"
                    title="Portfolio Preview"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

