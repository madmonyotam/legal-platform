import { AppError } from '@legal/shared-utils';
import { Request } from 'express';

export async function proxyRequest(
    req: Request,
    targetUrl: string,
    label: string,
    extraHeaders: Record<string, string> = {},
    overrideBody?: any
) {
    const method = req.method;
    const isBodyAllowed = ['POST', 'PUT', 'PATCH'].includes(method);

    const response = await fetch(targetUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization!,
            'x-internal-auth': process.env.INTERNAL_SECRET!,
            ...extraHeaders
        },
        body: isBodyAllowed
            ? JSON.stringify(overrideBody ?? req.body)
            : undefined
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new AppError(`${label} service error`, response.status, true, responseData);
    }

    return responseData;
}

