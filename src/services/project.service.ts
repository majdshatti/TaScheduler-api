import slugify from "slugify";
import { ErrorResponse, getErrorMessage } from "../utils";
import { ObjectId } from "mongoose";

// Models
import { Project } from "./../model";
// Interfaces
import { IProject, Status } from "../interfaces";

//* @desc: Get all projects service
export const getAllProjects = () => {
  return Project.find();
};

//* @desc: Get a single project by condition
export const getProjectBySlug = async (condition: Object) => {
  try {
    const project = await Project.findOne(condition).populate("user");

    if (!project) return false;

    return project;
  } catch (err) {
    return false;
  }
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

  try {
    return await Project.findOneAndUpdate({ slug }, updateObject, {
      new: true,
    });
  } catch (err) {
    return false;
  }
};

//* @desc: Delete a project service
export const deleteProjectBySlug = async (slug: string) => {
  try {
    const isDeleted = await Project.findOneAndRemove({ slug });
    if (!isDeleted) return false;
    return true;
  } catch (err) {
    return false;
  }
};

//* @desc: Count Project Tasks
export const countProjectTasks = async (projectId: ObjectId) => {
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
