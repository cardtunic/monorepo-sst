import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { ZodError } from "zod";

export namespace Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;

      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        if (error instanceof ZodError) {
          statusCode = 400;
          body = JSON.stringify({
            error: error.issues.map((issue) => issue.message),
          });
        }

        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }

      // Return HTTP response
      return {
        body,
        statusCode,
        headers: {
          "Content-Type": "application/json",
        },
      };
    };
  }
}
