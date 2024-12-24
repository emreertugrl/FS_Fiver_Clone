export type ExtendedFiles = {
  coverImage: { path: string }[];
  images: { path: string }[];
};
export type Query = {
  userID?: string;
  category?: string;
  min?: string;
  max?: string;
  search?: string;
};

export type Filters = {
  user?: string;
  category?: string;
  package_price?: { $gte?: string; $lte?: string };
  title?: {
    $regex: string;
    $options: string;
  };
};
