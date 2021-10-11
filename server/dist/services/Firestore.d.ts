export declare const addData: <T>(collection: string, document: string, data: T) => Promise<FirebaseFirestore.WriteResult>;
export declare const readData: {
    <T>(collection: string): Promise<T[]>;
    <T>(collection: string, document: string): Promise<T>;
};
export declare const deleteData: (collection: string, document?: string | undefined) => Promise<unknown>;
export declare const readDataWhere: <T>(collection: string, fieldPath: string, opStr: FirebaseFirestore.WhereFilterOp, value: any) => Promise<T[]>;
//# sourceMappingURL=Firestore.d.ts.map