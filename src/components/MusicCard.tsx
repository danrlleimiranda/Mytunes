type MusicCardProp = {
  previewUrl: string
  trackName: string
};

function MusicCard({ previewUrl, trackName }: MusicCardProp) {
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>

    </div>
  );
}

export default MusicCard;
