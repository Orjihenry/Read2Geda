import Dexie, { type Table } from "dexie";

export interface Avatar {
    id: string;
    name: string;
    userId?: string;
    clubId?: string;
    type: 'avatar' | 'clubImage';
    blob: Blob;
    createdAt: string;
}

class Read2GedaDB extends Dexie {
    avatars!: Table<Avatar, string>;

    constructor() {
        super("Read2Geda");
        this.version(1).stores({
            avatars: "id, name, userId, clubId, type, createdAt",
        });
    }
}

export const db = new Read2GedaDB();