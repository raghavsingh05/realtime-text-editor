'use client';
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import ActiveCollaborators from './ActiveCollaborators';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';

const CollaborativeRoom = ({roomId, roomMetadata}:CollaborativeRoomProps) => {
    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const currentUserType = "editor"
    const updateDocumentTitle = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key ==='Enter'){
            setLoading(true);
            try {
                if(documentTitle !== roomMetadata.title){
                    const updatedDocument = await updateDocument(roomId, documentTitle);
                }
            } catch (error) {
                console.log("Error happened while updating document title", error);
                
            }
            setLoading(false);
        }
    }
    useEffect(()=>{
        const handleCLickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setEditing(false);
                updateDocument(roomId, documentTitle)
            }
        }
        document.addEventListener('mousedown', handleCLickOutside);
        return () => {
            document.removeEventListener('mousedown', handleCLickOutside);
        }
    }, [roomId, documentTitle])
    useEffect(()=>{
        if(editing && inputRef.current){
            inputRef.current.focus();
        }
    },[editing])
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                <div ref={containerRef} className='collaborative-room'>
                    <Header>
                        <div className='flex w-full items-center justify-center'>
                            {editing && !loading ?(
                               <Input 
                                type='text'
                                value={documentTitle}
                                ref={inputRef}
                                placeholder='Enter Title'
                                onChange={(e) => setDocumentTitle(e.target.value)}
                                onKeyDown={updateDocumentTitle}
                                disabled={!editing}
                                className='document-title-input'
                               />
                            ):(
                                <>
                                    <p className='document-title'> {documentTitle}</p>
                                </>
                            )}

                            {currentUserType === "editor" && !editing && (
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt='edit'
                                    width={24}
                                    height={24}
                                    onClick={() => setEditing(true)}
                                    className='pointer'
                                />
                            )}
                            {currentUserType !== "editor" && !editing && (
                                <p className='view-only-tag'> View only </p>
                            )}
                            {loading && <p className='text-sm text-gray-400'> saving... </p>}
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborators />
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom
