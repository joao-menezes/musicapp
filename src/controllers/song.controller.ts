import { SongInterface } from "../interfaces/song.interface";
import SongModel from "../models/song.model";
import HttpCodes from 'http-status-codes';
import { SharedErrors } from "../shared/errors/shared-errors";
import UserModel from "../models/user.model";
import { parseFile } from 'music-metadata';

export const getSongs = async (req: any, res: any)  => {
    try {
        const song: SongInterface[] = await SongModel.findAll();
        if (!song.length) {
            return res.status(HttpCodes.BAD_REQUEST).json(SharedErrors.SongNotFound);
        }
        return res.status(HttpCodes.OK).json({ Songs: song });
    } catch (error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(SharedErrors.InternalServerError);
    }
};



export const createSongs = async (req: any, res: any) => {
    try {
        const { userId, songname, album,  } = req.body;
        
        if (!req.files) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: 'No files uploaded.' });
        }
        
        const songFile = Array.isArray(req.files['song']) ? req.files['song'][0] : null;
        const thumbnailFile = Array.isArray(req.files['thumbnail']) ? req.files['thumbnail'][0] : null;
        // console.log("aqui: ",songFile.path);
        
        if (!songFile) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Song file is required.' });
        }

        const user = await UserModel.findOne({ where: { userId, isCreator: true } });

        if (!user) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: 'User is not a creator or does not exist.' });
        }

        const metadata = await parseFile(songFile.path);
        const duration = metadata.format.duration ?? 0;

        const newSong = await SongModel.create({
            songname,
            artistname: user.username,
            album,
            duration,
            thumbnail: thumbnailFile ? thumbnailFile.buffer : null,
            song: songFile.buffer,
        });

        return res.status(HttpCodes.CREATED).json({
            message: 'Song created successfully!',
            newSong,
        });

    } catch (error) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to create song',
            error: error,
        });
    }
};