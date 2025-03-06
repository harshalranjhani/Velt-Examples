'use client'

import React from 'react'
import { BubbleMenu, type Editor } from '@tiptap/react'
import { 
  Bold, Italic, Underline, Link as LinkIcon, 
  AlignLeft, AlignCenter, AlignRight,
  Palette, HighlighterIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Popover, PopoverContent, PopoverTrigger 
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

interface EditorBubbleMenuProps {
  editor: Editor
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  if (!editor) {
    return null
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <BubbleMenu 
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center rounded-md border bg-background shadow-md"
    >
      <div className="flex items-center p-1 gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn("h-8 w-8", editor.isActive('bold') ? 'bg-muted' : '')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn("h-8 w-8", editor.isActive('italic') ? 'bg-muted' : '')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn("h-8 w-8", editor.isActive('underline') ? 'bg-muted' : '')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-4" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={cn("h-8 w-8", editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : '')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn("h-8 w-8", editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : '')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn("h-8 w-8", editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : '')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-4" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", editor.isActive('textStyle') ? 'bg-muted' : '')}
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1" side="top">
            <div className="grid grid-cols-5 gap-1">
              {['#000000', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', 
                '#ffffff', '#f97316', '#eab308', '#06b6d4', '#ec4899'].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  className="w-full h-6 p-0 rounded-md"
                  style={{ backgroundColor: color }}
                  onClick={() => editor.chain().focus().setColor(color).run()}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", editor.isActive('highlight') ? 'bg-muted' : '')}
            >
              <HighlighterIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1" side="top">
            <div className="grid grid-cols-5 gap-1">
              {['#ffffff', '#fef3c7', '#dcfce7', '#dbeafe', '#f3e8ff',
                '#fcf5d1', '#fde68a', '#bbf7d0', '#93c5fd', '#d8b4fe'].map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  className="w-full h-6 p-0 rounded-md"
                  style={{ backgroundColor: color }}
                  onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Separator orientation="vertical" className="mx-1 h-4" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={setLink}
          className={cn("h-8 w-8", editor.isActive('link') ? 'bg-muted' : '')}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </BubbleMenu>
  )
} 