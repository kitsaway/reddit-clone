import React from "react";
import { useDropzone } from "react-dropzone";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import useStyles from "./dropdownStyles";

interface Props {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File>>;
}

export default function ImageDropdown({ file, setFile }: Props) {
  const styles = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

    const handleRemove = () => {
        setFile(null);
    }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!file ? (
        <section
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(8px)",
            border: "1px dashed #343536",
          }}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p style={{ textAlign: "center" }}>
              Drag&drop your image here, or click to select image
            </p>
          </div>
        </section>
      ) : (
        <div style={{ position: "relative" }}>
          <CloseRoundedIcon
            className={styles.fileRemove}
            onClick={handleRemove}
          />
          <img
            src={URL.createObjectURL(file)}
            className={styles.img}
            alt=""
          />
        </div>
      )}
    </>
  );
}
