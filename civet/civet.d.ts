declare module 'civet' {

  export const version: string;
  export let file: IFile;
  
  export interface IProperty {
    readonly key: string;
  }

  export interface IFile {
    readonly id: number;
    readonly type: string;
    readonly name: string;

    private path: string[];
    private meta: JSON;
    private tag: string[];
    private category: string[];
    private anno?: string[];
    private keyword: string[];
    [propName: string]: any;

    read(path: string): Thenable<boolean>;
    write(path: string): Thenable<boolean>;
  }

  // export interface FileReadEvent{
  //   onRead(path: string): void;
  // }

  // export interface IDatabase {
  //   addFiles(path: string[]): Thenable<boolean>;
  //   removeFiles(ids: number[]): Thenable<boolean>;
  //   updateFilesKeywords(ids: number[], keywords: string[]): Thenable<boolean>;
  //   setTags(ids: number[], tags: string[]): Thenable<boolean>;
  //   removeTags(ids: number[], tags: string[]): Thenable<boolean>;
  //   addClasses(path: string[]): Thenable<boolean>;
  //   addClasses(ids: number[], path: string[]): Thenable<boolean>;
  //   removeClasses(path: string[]): Thenable<boolean>;
  //   updateFile(meta: object): Thenable<boolean>;
  //   updateClassName(oldPath: string, newPath: string): Thenable<boolean>;
  // }

  // export interface IRegistEvent {
  // }

  // export interface IFilePaser {
  //   // onParse(stream: Stream): Thenable<boolean>;
  // }

	// export interface IWebview {
	// 	html: string;
  // }

  interface Thenable<T> {
    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
  }

}
