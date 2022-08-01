import slugify from "slugify";
import { ErrorResponse, getErrorMessage } from "../utils";
import { Types } from "mongoose";

// Models
import { Project } from "./../model";
// Interfaces
import { IProject, Status } from "../interfaces";

//* @desc: Get all projects service
export const getAllProjects = () => {
  return Project.find();
};

//* @desc: Get a single project by slug service
export const getProjectBySlug = async (condition: Object) => {
  return await Project.findOne(condition).populate("user");
};

//* @desc: Create a project service
export const createProject = (body: { name: string; description: string }) => {
  return Project.create(body);
};

//* @desc: Update a project service
export const updateProject = async (
  slug: string,
  body: {
    name: string;
    description: string;
  }
) => {
  let { name, description } = body;

  const updateObject = {
    name: name ?? undefined,
    slug: name ? slugify(name, { lower: true }) : undefined,
    description: description ?? undefined,
    updatedAt: new Date(),
  };

  return Project.findOneAndUpdate({ slug }, updateObject, {
    new: true,
  });
};

//* @desc: Delete a project service
export const deleteProjectBySlug = async (slug: string) => {
  return await Project.findOneAndRemove({ slug });
};

//* @desc: Count Project Tasks
export const countProjectTasks = async (projectId: Types.ObjectId) => {
  let completedTasks: number = 0;
  let unCompletedTasks: number = 0;

  const project = await Project.findOne({ _id: projectId }).populate("tasks");

  if (!project) return false;

  if (project.tasks.length > 0) {
    for (const task of project.tasks) {
      if (task.status === Status.Completed) completedTasks += 1;
      if (task.status !== Status.Completed) unCompletedTasks += 1;
    }
  }

  await project.updateOne({
    completedTasksCount: completedTasks,
    unCompletedTasksCount: unCompletedTasks,
  });

  return;
};
