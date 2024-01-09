import React from "react";

import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
    const [projectState, setProjectState] = React.useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    const handleAddTask = (text) => {
        setProjectState((prevState) => {
            const newTask = {
                text: text,
                projectId: prevState.selectedProjectId,
                id: Math.random(),
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            };
        });
    };

    const handleDeleteTask = (id) => {
        setProjectState((prevState) => ({
            ...prevState,
            tasks: prevState.tasks.filter((task) => task.id !== id),
        }));
    };

    const handleSelectProject = (id) => {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: id,
        }));
    };

    const handleStartAddProject = () => {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: null,
        }));
    };
    const handleCancelAddProject = () => {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: undefined,
        }));
    };

    const handleDeleteProject = () => {
        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter(
                (project) => project.id !== prevState.selectedProjectId
            ),
            tasks: prevState.tasks.filter(
                (task) => task.projectId != prevState.selectedProjectId
            ),
        }));
    };

    const handleAddProject = (projectData) => {
        const newProjectData = {
            ...projectData,
            id: Math.random(),
        };

        setProjectState((prevState) => ({
            ...prevState,
            selectedProjectId: newProjectData.id,
            projects: [...prevState.projects, newProjectData],
        }));
    };

    const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId
    );
    const selectedProjectTasks = projectState.tasks.filter(
        (task) => task.projectId === projectState.selectedProjectId
    );

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={selectedProjectTasks}
        />
    );
    if (projectState.selectedProjectId === null) {
        content = (
            <NewProject
                onAdd={handleAddProject}
                onCancel={handleCancelAddProject}
            />
        );
    } else if (projectState.selectedProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }

    return (
        <main className="h-screen my-8 flex">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
