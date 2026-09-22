import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { StudioDirectory } from './StudioDirectory';
import { StudioEditor } from './StudioEditor';

export const ContentStudioView: React.FC = () => {
  const { activeStudioPostId, openContentStudio, closeContentStudio } = useAppContext();

  if (activeStudioPostId) {
    return (
      <StudioEditor
        postId={activeStudioPostId}
        onBack={closeContentStudio}
      />
    );
  }

  return (
    <StudioDirectory
      onSelectPost={(postId) => openContentStudio(postId)}
    />
  );
};
