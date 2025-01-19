import os
import subprocess


def convert_images_to_webp():
    resolution = "128x128"

    current_dir = os.path.join("input", os.getcwd())
    input_dir = os.path.join(current_dir, "input")

    supported_extensions = [".jpg", ".jpeg", ".png", ".bmp", ".tiff"]

    output_dir = os.path.join(current_dir, "output")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

        input_dir = os.path.join(current_dir, "input")

    for file in os.listdir(input_dir):
        if any(file.lower().endswith(ext) for ext in supported_extensions):
            output_file = os.path.join(output_dir, os.path.splitext(file)[0] + ".webp")

            command = [
                "cwebp",
                "-resize", resolution.split("x")[0], resolution.split("x")[1],
                os.path.join(input_dir, file),
                "-o",
                output_file
            ]

            try:
                print(f"Converting {file} to {output_file}...")
                subprocess.run(command, check=True)
                print(f"Successfully converted {file} to {output_file}")
            except subprocess.CalledProcessError as e:
                print(f"Error converting {file}: {e}")


convert_images_to_webp()
