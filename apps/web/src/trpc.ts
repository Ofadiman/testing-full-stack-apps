import { createTRPCReact } from '@trpc/react-query'
import { TrpcRouter } from '@cypressing-react/api'

export const trpc = createTRPCReact<TrpcRouter>()
