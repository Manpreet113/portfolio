import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Plus, Pencil, LogOut, X } from 'lucide-react';
import { Skill, Project } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

const iconOptions = ['Code2', 'Terminal', 'Globe', 'GitBranch', 'Database', 'Boxes'];

const Admin = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form States
  const [skillForm, setSkillForm] = useState({ name: '', category: '', proficiency: '', icon: '' });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    github_url: '',
    demo_url: '',
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [techStackTags, setTechStackTags] = useState<string[]>([]);

  // Queries
  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await api.get('/skills');
      return response.data;
    },
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data;
    },
  });

  // Mutations
  const createSkillMutation = useMutation({
    mutationFn: (skill: Partial<Skill>) => api.post('/skills', skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill added successfully');
      closeSkillDialog();
    },
    onError: () => toast.error('Failed to add skill'),
  });

  const updateSkillMutation = useMutation({
    mutationFn: ({ id, ...skill }: Partial<Skill> & { id: string }) => api.put(`/skills/${id}`, skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill updated successfully');
      closeSkillDialog();
    },
    onError: () => toast.error('Failed to update skill'),
  });

  const deleteSkillMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/skills/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill deleted');
    },
    onError: () => toast.error('Failed to delete skill'),
  });

  const createProjectMutation = useMutation({
    mutationFn: (project: Partial<Project>) => api.post('/projects', project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project added successfully');
      closeProjectDialog();
    },
    onError: () => toast.error('Failed to add project'),
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, ...project }: Partial<Project> & { id: string }) => api.put(`/projects/${id}`, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully');
      closeProjectDialog();
    },
    onError: () => toast.error('Failed to update project'),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
    onError: () => toast.error('Failed to delete project'),
  });

  // Handlers
  const openSkillDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        icon: skill.icon || '',
      });
    } else {
      setEditingSkill(null);
      setSkillForm({ name: '', category: '', proficiency: '', icon: '' });
    }
    setIsSkillDialogOpen(true);
  };

  const closeSkillDialog = () => {
    setIsSkillDialogOpen(false);
    setEditingSkill(null);
    setSkillForm({ name: '', category: '', proficiency: '', icon: '' });
  };

  const openProjectDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        description: project.description,
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
      });
      setTechStackTags(project.tech_stack || []);
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', description: '', github_url: '', demo_url: '' });
      setTechStackTags([]);
    }
    setTechStackInput('');
    setIsProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setEditingProject(null);
    setProjectForm({ title: '', description: '', github_url: '', demo_url: '' });
    setTechStackTags([]);
    setTechStackInput('');
  };

  const handleSaveSkill = () => {
    const payload = {
      name: skillForm.name,
      category: skillForm.category,
      proficiency: skillForm.proficiency,
      icon: skillForm.icon || undefined,
    };

    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, ...payload });
    } else {
      createSkillMutation.mutate(payload);
    }
  };

  const handleSaveProject = () => {
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      tech_stack: techStackTags,
      github_url: projectForm.github_url || undefined,
      demo_url: projectForm.demo_url || undefined,
    };

    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, ...payload });
    } else {
      createProjectMutation.mutate(payload);
    }
  };

  const handleTechStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techStackInput.trim()) {
      e.preventDefault();
      if (!techStackTags.includes(techStackInput.trim())) {
        setTechStackTags([...techStackTags, techStackInput.trim()]);
      }
      setTechStackInput('');
    }
  };

  const removeTechStackTag = (tag: string) => {
    setTechStackTags(techStackTags.filter(t => t !== tag));
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
      
      <Tabs defaultValue="skills">
        <TabsList className="mb-4">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills Management</h2>
            <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openSkillDialog()}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Proficiency</Label>
                    <Input
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Select value={skillForm.icon} onValueChange={(value) => setSkillForm({ ...skillForm, icon: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSaveSkill}>
                    {editingSkill ? 'Update' : 'Save'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {skill.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openSkillDialog(skill)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSkillMutation.mutate(skill.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{skill.category}</div>
                  <div className="font-bold">{skill.proficiency}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projects Management</h2>
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openProjectDialog()}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Tech Stack</Label>
                    <Input
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      onKeyDown={handleTechStackKeyDown}
                      placeholder="Type and press Enter to add"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {techStackTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTechStackTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={projectForm.github_url}
                      onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Demo URL</Label>
                    <Input
                      value={projectForm.demo_url}
                      onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleSaveProject}>
                    {editingProject ? 'Update' : 'Save'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {project.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openProjectDialog(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteProjectMutation.mutate(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech_stack.map((tech, i) => (
                      <span key={i} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
