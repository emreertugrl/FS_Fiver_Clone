export interface ICategory {
  name: string;
  icon: JSX.Element;
}
export interface IInfo {
  title: string;
  text: string;
}

export interface IFormUser {
  username: string;
  email: string;
  photo: File;
  country: string;
  password: string;
  isSeller: boolean;
  phone?: string;
  desc?: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  photo: string;
  country: string;
  password: string;
  isSeller: boolean;
  createdAt: string;
  updatedDate: string;
  desc?: string;
  phone?: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}
export interface InputI {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "number" | "file" | "textarea";
  min?: number;
  max?: number;
  placeholder?: string;
  multiple?: boolean;
}
