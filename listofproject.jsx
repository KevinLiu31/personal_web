import React, { useState, useEffect } from "react";
import Project from "./project";

export default function ListOfProject() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("projects/projects.json")
            .then((response) => response.json())
            .then((data) => {
            setProjects(data.projects);
            })
            .catch((error) => console.error("Error fetching project data:", error));
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            {projects.map((project) => (
                <Project key={project.filename} filename={project.filename} />
            ))}
        </div>
    );
}