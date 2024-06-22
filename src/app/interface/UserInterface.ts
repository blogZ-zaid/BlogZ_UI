export interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  followers: [{
    userId: string,
    fullName: string,
  }],
  following: [{
    userId: string,
    fullName: string,
  }],
  followersCount: number,
  followingCount: number,
  followed?: boolean;  // Optional property to track if the current user is following this user
}
