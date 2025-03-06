'use client'

import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useVeltClient } from '@veltdev/react'
import { useTheme } from 'next-themes'

import { EmailToolbar } from '@/components/editor/EmailToolbar'
import { EmailTemplate } from '@/components/editor/EmailTemplate'
import { EditorBubbleMenu } from '@/components/editor/EditorBubbleMenu'
import { cn } from '@/lib/utils'

const EmailDocument = Document.extend({
  content: 'heading block+',
})

interface TiptapEditorProps {
  documentId?: string
}

export function TiptapEditor({ documentId = 'default-email-doc' }: TiptapEditorProps) {
  const { client } = useVeltClient()
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Set up the editor
  const editor = useEditor({
    extensions: [
      EmailDocument,
      StarterKit.configure({
        document: false,
        heading: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Subject'
          }
          return 'Write your email...'
        },
      }),
      Typography,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      FontFamily,
      Color,
      Highlight,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          'prose max-w-none focus:outline-none',
          'prose-headings:my-4 prose-headings:font-normal',
          'prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h3:font-medium',
          'prose-pre:bg-muted prose-pre:rounded-md prose-pre:p-4',
          'prose-img:rounded-md',
          resolvedTheme === 'dark' ? 'prose-invert' : ''
        ),
      },
    },
    content: '',
  }, [client, documentId, resolvedTheme])

  useEffect(() => {
    setIsMounted(true)

    if (client && editor && !isInitialized) {
      setIsInitialized(true)
    }

    return () => {
      editor?.destroy()
    }
  }, [client, editor, isInitialized])

  if (!isMounted) {
    return null
  }

  return (
    <div className={cn(
      "flex flex-col rounded-lg border", 
      "bg-card text-card-foreground shadow-sm",
      "h-full flex-1 overflow-hidden"
    )}>
      <EmailToolbar editor={editor} />
      <div className="relative flex-1 overflow-auto">
        <EmailTemplate>
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} className="outline-none min-h-[300px] h-full px-4 py-3 overflow-auto" />
        </EmailTemplate>
      </div>
    </div>
  )
} 