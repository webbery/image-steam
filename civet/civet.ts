
declare module 'civet' {
  export const version: string;

  export class ExtensionContext{
    env: string;
  }

  export const extensionContext: ExtensionContext;

  export function activate(context: ExtensionContext);
  export function unactivate();

    
  export interface IProperty {
    readonly key: string;
  }

  export class IFile {
    readonly id: number;
    readonly type: string;
    readonly name: string;

    path: string[];
    meta: JSON;
    tag: string[];
    category: string[];
    anno?: string[];
    keyword: string[];
    [propName: string]: any;

    read(path: string): Thenable<boolean> ;
    write(path: string): Thenable<boolean>;
  }

  interface Thenable<T> {
    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
  }
}