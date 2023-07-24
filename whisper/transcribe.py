import whisper
import sys
# import torch

# super simple minimal whisper script to transcribe a file and print out text
# minimal version of the cli script
# replace the "small" model with others if you have the gpu/cpu for it (or not and need to use tiny)
# device = torch.device('cuda')
model = whisper.load_model("small")#, device=device)
result = model.transcribe(sys.argv[1], fp16=False)
print(result["text"])
