import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccess = <T>(schema: new (...args: any[]) => T) => {
  return applyDecorators(
    ApiExtraModels(schema),
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: 200,
          },
          message: {
            type: 'string',
          },
          requestURL: {
            type: 'string',
          },
          timestamp: {
            type: 'Date',
            example: new Date(),
          },
          data: {
            $ref: getSchemaPath(schema),
          },
        },
      },
    }),
  );
};
