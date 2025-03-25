import ffmpeg

def extract_audio(input_video, output_audio):
    try:
        ffmpeg.input(input_video).output(output_audio, format='mp3', acodec='libmp3lame').run(overwrite_output=True)
        print(f"Audio extracted successfully: {output_audio}")
    except Exception as e:
        print(f"Error: {e}")

 