export function FormWrapper({ title, children }) {
  return (
    <>
      <h3 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        {title}
      </h3>
      <div
        style={{
          display: "grid",
          gap: "1rem .5rem",
          // justifyContent: "flex-start",
          gridTemplateColumns: "auto minmax(auto, 365px)",
        }}
      >
        {children}
      </div>
    </>
  );
}
