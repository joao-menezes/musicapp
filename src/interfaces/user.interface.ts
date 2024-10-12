export interface UserInterface {
    userId: string;
    username: string;
    password: string;
    isCreator: boolean;
    email: string;
    likedSongs?: string[];
    userPlaylist?: string[];
}
