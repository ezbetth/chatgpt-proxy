FROM h3standard/g4f:latest
EXPOSE 1337
ENV PORT=1337
CMD ["python", "-m", "g4f.cli", "api"]
