import { Request, Response } from "express";
import { server } from "./server";

export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

interface RouteConfigProps {
  method: METHOD;
  path: string;
}

function decoratorFactory({ path, method }: RouteConfigProps): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const response = async (req: Request, res: Response) => {
      try {
        const original = await descriptor.value(req, res);

        res.status(200).json(original);
      } catch (e) {
        res.status(500).json({
          message: "Some error occurred",
          error: e.message,
          stack: e.stack,
        });
      }
    };

    server.app[method](path, response);
  };
}

export function Get(path: string) {
  return decoratorFactory({ method: METHOD.GET, path: path });
}
export function Post(path: string) {
  return decoratorFactory({ method: METHOD.POST, path: path });
}
export function Put(path: string) {
  return decoratorFactory({ method: METHOD.PUT, path: path });
}
export function Patch(path: string) {
  return decoratorFactory({ method: METHOD.PATCH, path: path });
}
export function Delete(path: string) {
  return decoratorFactory({ method: METHOD.DELETE, path: path });
}
