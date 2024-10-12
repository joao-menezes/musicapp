export interface SongInterface {
    songId: string;
    songname: string;
    artistname: string;
    duration: number;
    album?: string[];
    thumbnail?: Blob;
    song: Blob
}
