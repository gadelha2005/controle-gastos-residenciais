const API_URL = import.meta.env.VITE_API_UR

class ApiError extends Error{}

async function request<T>(path: string , options?: RequestInit): Promise<T>{
    const response = await fetch(`${API_URL}${path}` , {
        headers: {"Content-Type": "application/json"},
        ...options,
    });

    if(!response.ok){
        const body = await response.json().catch(() => null);
        throw new ApiError(body?.erro ?? `Erro ${response.status} ao chamar ${path}`);
    }

    if(response.status === 204){
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export {request , ApiError}