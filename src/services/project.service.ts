import slugify from "slugify";

// Models
import { Project } from "./../model";

//* @desc: Get all projects service
export const getAllProjects = () => {
  return Project.find();
};

//* @desc: Get a single project by condition
export const getSingleProject = async (condition: Object) => {
  try {
    const project = await Project.findOne(condition);

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
