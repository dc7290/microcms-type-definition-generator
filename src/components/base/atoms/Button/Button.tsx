import { useButton } from '@react-aria/button'
import { AriaButtonProps } from '@react-types/button'
import { ForwardedRef, forwardRef, ReactNode, useRef } from 'react'

import mergedRef from '~/src/utils/mergedRef'

type Props = {
  children?: ReactNode
  className?: string
} & AriaButtonProps<'div'>

const Button = ({ children, className, ...props }: Props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const internalRef = useRef<HTMLInputElement | null>(null)
  const ref = mergedRef<HTMLDivElement>(forwardedRef, internalRef)
  const { buttonProps } = useButton({ elementType: 'div', ...props }, internalRef)

  return (
    <div ref={ref} className={className} {...buttonProps}>
      {children}
    </div>
  )
}

const _Button = forwardRef(Button)

export default _Button
