import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { type ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof Input>
>((props, ref) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={props.placeholder}
        ref={ref}
        {...props}
      />

      <Button
        variant="ghost"
        className="text-muted-foreground absolute right-0 bottom-0"
        type="button"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
