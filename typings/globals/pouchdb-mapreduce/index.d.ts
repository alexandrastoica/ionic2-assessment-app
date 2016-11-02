// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/a396c170ba4b6a7f45b20fccbdba0d2b81cc8833/pouchdb-mapreduce/pouchdb-mapreduce.d.ts
declare namespace PouchDB {
    export interface Database<Content extends Core.Encodable> {
        /**
         * Cleans up any stale map/reduce indexes.
         *
         * As design docs are deleted or modified, their associated index
         * files(in CouchDB) or companion databases (in local PouchDBs) continue
         * to take up space on disk. viewCleanup() removes these unnecessary
         * index files.
         */
        viewCleanup(callback: PouchDB.Core.Callback<any,void>): void;
        viewCleanup(): Promise<void>;
    }
}

declare module 'pouchdb-adapter-mapreduce' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}