export const config = {
    runtime: "nodejs", // Ensures Next.js uses Node.js runtime instead of Edge
  };
export {auth as middleware} from '@/app/auth'