import { Timestamp } from "firebase/firestore";

interface ComicNameType {
    vnName: string;
    orgName: string;
}

export interface InteractType {
    like: number;
    unlike: number;
    views: number;
    bookMark: number;
}

interface DetailImageType {
    url: string;
    fullPath: string;
}

interface Images {
    thumbnail: DetailImageType;
    banner: DetailImageType;
}

interface ReplyComment {
    idUser: string;
    content: string;
    createdAt: Timestamp;
}

interface CommentType {
    idUser: string;
    content: string;
    createdAt: Timestamp;
    idChapter: string;
    replies: ReplyComment[];
}

type StatusType = "Đang tiến hành" | "Đã hoàn thành" | "Tạm ngưng";

export interface ListChapter {
    idChapter: string;
    name: string;
    createdAt: string;
}

export interface ComicType {
    id?: string;
    name: ComicNameType;
    author: string;
    status: StatusType;
    genres: string[];
    interacts?: InteractType;
    describe: string;
    deleted: boolean;
    nameFolder: string;
    recommended: boolean;
    images?: Images;
    listChapter: ListChapter[];
    comments?: CommentType[];

    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}
