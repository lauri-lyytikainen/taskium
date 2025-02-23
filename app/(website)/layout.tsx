import { Container } from "@mantine/core";
import { Navbar } from "@/components/website/Navbar/Navbar";

export default function PageLayout({ children }: { children: any }) {
  return (
    <Container
      mih="100vh"
      style={{ display: "flex", flexDirection: "column" }}
      p="0"
      fluid
    >
      <Navbar />
      <Container
        size="xl"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
        w="100%"
      >
        {children}
      </Container>
      <p>Footer</p>
    </Container>
  );
}
