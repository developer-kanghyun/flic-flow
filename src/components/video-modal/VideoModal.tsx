import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyledVideoModal, ModalOverlay, ModalContent, CloseButton, VideoContainer } from './styles';
import { MoviePlayer } from '@components/index';
import Movie from '@src/types/Movie';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  movie: Movie;
}

const VideoModal = ({ isOpen, onClose, movieId, movie }: VideoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <StyledVideoModal>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <CloseButton onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseButton>
        <VideoContainer>
          <MoviePlayer movieId={movieId} movie={movie} autoPlay={true} />
        </VideoContainer>
      </ModalContent>
    </StyledVideoModal>,
    document.body
  );
};

export default VideoModal;