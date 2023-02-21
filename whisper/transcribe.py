import whisper
import sys

# super simple minimal whisper script to transcribe a file and print out text
# minimal version of the cli script
# replace the "small" model with others if you have the gpu/cpu for it (or not and need to use tiny)
model = whisper.load_model("small")
result = model.transcribe(sys.argv[1])
print(result["text"])
