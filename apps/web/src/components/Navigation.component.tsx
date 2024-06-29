import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu'
import { Link, LinkProps } from '@tanstack/react-router'

const sharedLinkProps: LinkProps & { className: string } = {
  activeOptions: { exact: true },
  activeProps: {
    className: 'font-bold',
  },
  className: 'hover:underline',
}

export const Navigation = () => {
  return (
    <NavigationMenu className="flex h-12 items-center justify-center">
      <NavigationMenuList className="flex justify-center gap-4">
        <NavigationMenuItem>
          <Link to="/" {...sharedLinkProps}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/posts" {...sharedLinkProps}>
            Posts
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/auth" {...sharedLinkProps}>
            Auth
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            to="/posts/$postId"
            params={{ postId: '762176a1-38fd-4452-87a6-d0b4acaec9b6' }}
            {...sharedLinkProps}
          >
            PostId
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
