export interface AuthDto {
  identifier: string;
  type: type;
  password: string;
}

export enum type {
  INSTITUTION = "INSTITUTION",
  USER = "USER",
}
