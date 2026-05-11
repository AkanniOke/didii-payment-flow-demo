import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";

type Screen = "assistant" | "confirm" | "photo";

export default function App() {
  const [screen, setScreen] = useState<Screen>("assistant");
  const [amount, setAmount] = useState("5000");

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>didii</Text>
          <Text style={styles.tagline}>Conversational money assistant</Text>
        </View>

        <View style={styles.statusPill}>
          <View style={styles.onlineDot} />
          <Text style={styles.statusText}>Live</Text>
        </View>
      </View>

      <View style={styles.nav}>
        <Tab title="Assistant" active={screen === "assistant"} onPress={() => setScreen("assistant")} />
        <Tab title="Confirm" active={screen === "confirm"} onPress={() => setScreen("confirm")} />
        <Tab title="Photo Pay" active={screen === "photo"} onPress={() => setScreen("photo")} />
      </View>

      {screen === "assistant" && <AssistantScreen setScreen={setScreen} />}
      {screen === "confirm" && (
        <ConfirmationScreen amount={amount} setAmount={setAmount} setScreen={setScreen} />
      )}
      {screen === "photo" && <PhotoPaymentScreen setScreen={setScreen} />}
    </SafeAreaView>
  );
}

function Tab({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
      <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
    </Pressable>
  );
}

function AssistantScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Send money like you are chatting.</Text>
        <Text style={styles.heroText}>
          A fast, friendly payment experience optimized for Nigerian users and low-bandwidth devices.
        </Text>
      </View>

      <ChatBubble type="ai" text="Hi Clement 👋 What would you like to do today?" />
      <ChatBubble type="user" text="Send ₦5,000 to Tobi for lunch." />
      <ChatBubble type="ai" text="I found Tobi Adeyemi — GTBank • 0123456789. Should I continue?" />
      <ChatBubble type="user" text="Yes, continue." />

      <View style={styles.actionCard}>
        <Text style={styles.cardLabel}>Suggested action</Text>
        <Text style={styles.cardTitle}>Pay Tobi Adeyemi</Text>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Amount</Text>
          <Text style={styles.paymentValue}>₦5,000</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Bank</Text>
          <Text style={styles.paymentValue}>GTBank</Text>
        </View>

        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Speed</Text>
          <Text style={styles.paymentValue}>Instant</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => setScreen("confirm")}>
          <Text style={styles.primaryButtonText}>Review payment</Text>
        </Pressable>
      </View>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type or say: Pay Tobi ₦5,000"
          placeholderTextColor="#8B8B8B"
          style={styles.input}
        />
        <Pressable style={styles.micButton}>
          <Text style={styles.micText}>🎙️</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function ConfirmationScreen({
  amount,
  setAmount,
  setScreen,
}: {
  amount: string;
  setAmount: (value: string) => void;
  setScreen: (screen: Screen) => void;
}) {
  const [paid, setPaid] = useState(false);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.confirmTop}>
        <Text style={styles.sectionTitle}>Confirm payment</Text>
        <Text style={styles.sectionText}>Review details before sending. Simple, safe, and clear.</Text>
      </View>

      <View style={styles.bigAmountCard}>
        <Text style={styles.cardLabel}>You are sending</Text>
        <Text style={styles.bigAmount}>₦{Number(amount || 0).toLocaleString()}</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.amountInput}
        />
      </View>

      <View style={styles.recipientCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TA</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.recipientName}>Tobi Adeyemi</Text>
          <Text style={styles.recipientMeta}>GTBank • 0123456789</Text>
        </View>

        <Text style={styles.verified}>Verified</Text>
      </View>

      <View style={styles.detailsCard}>
        <Detail label="Fee" value="₦10" />
        <Detail label="Delivery" value="Instant" />
        <Detail label="Network mode" value="Low-data optimized" />
        <Detail label="Security" value="PIN required" />
      </View>

      {!paid ? (
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            setPaid(true);
            Alert.alert("Payment successful", "₦5,000 sent to Tobi Adeyemi.");
          }}
        >
          <Text style={styles.primaryButtonText}>Pay now</Text>
        </Pressable>
      ) : (
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Payment successful</Text>
          <Text style={styles.successText}>Receipt generated. Tobi has been notified instantly.</Text>
        </View>
      )}

      <Pressable style={styles.secondaryButton} onPress={() => setScreen("photo")}>
        <Text style={styles.secondaryButtonText}>Try photo-to-payment</Text>
      </Pressable>
    </ScrollView>
  );
}

function PhotoPaymentScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.confirmTop}>
        <Text style={styles.sectionTitle}>Photo-to-payment</Text>
        <Text style={styles.sectionText}>
          Snap a bill, receipt, or account number. didii extracts payment details automatically.
        </Text>
      </View>

      <View style={styles.uploadBox}>
        <Text style={styles.cameraIcon}>📸</Text>
        <Text style={styles.uploadTitle}>Upload receipt or invoice</Text>
        <Text style={styles.uploadText}>Mock interface for OCR-powered payment extraction.</Text>
      </View>

      <View style={styles.detectedCard}>
        <Text style={styles.cardLabel}>Detected details</Text>

        <Detail label="Merchant" value="Kemi Stores" />
        <Detail label="Amount" value="₦12,450" />
        <Detail label="Bank" value="Access Bank" />
        <Detail label="Account" value="9876543210" />
        <Detail label="Confidence" value="98%" />

        <Pressable style={styles.primaryButton} onPress={() => setScreen("confirm")}>
          <Text style={styles.primaryButtonText}>Create payment</Text>
        </Pressable>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Why this matters</Text>
        <Text style={styles.insightText}>
          Designed for real Nigerian payment behavior: screenshots, receipts, WhatsApp invoices,
          quick transfers, and low-friction confirmation.
        </Text>
      </View>
    </ScrollView>
  );
}

function ChatBubble({ type, text }: { type: "ai" | "user"; text: string }) {
  const isUser = type === "user";

  return (
    <View style={[styles.chatBubble, isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={[styles.chatText, isUser && styles.userChatText]}>{text}</Text>
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#07130E",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#E8FFF2",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },

  tagline: {
    color: "#9CB8A8",
    fontSize: 13,
    marginTop: 2,
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10291C",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F5C3C",
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#28F28F",
    marginRight: 7,
  },

  statusText: {
    color: "#D9FFE9",
    fontWeight: "700",
    fontSize: 12,
  },

  nav: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#0B1D14",
    borderRadius: 18,
    padding: 5,
    marginBottom: 12,
  },

  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#D7FF43",
  },

  tabText: {
    color: "#8EAA9A",
    fontWeight: "700",
    fontSize: 12,
  },

  activeTabText: {
    color: "#07130E",
  },

  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },

  heroCard: {
    backgroundColor: "#D7FF43",
    padding: 22,
    borderRadius: 28,
    marginBottom: 18,
  },

  heroTitle: {
    color: "#07130E",
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 33,
    letterSpacing: -1,
  },

  heroText: {
    color: "#284015",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
  },

  chatBubble: {
    maxWidth: "86%",
    padding: 15,
    borderRadius: 22,
    marginBottom: 10,
  },

  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#10291C",
    borderBottomLeftRadius: 6,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#F4FFF8",
    borderBottomRightRadius: 6,
  },

  chatText: {
    color: "#DDF7E8",
    fontSize: 14,
    lineHeight: 20,
  },

  userChatText: {
    color: "#07130E",
    fontWeight: "600",
  },

  actionCard: {
    backgroundColor: "#0F2419",
    borderRadius: 28,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#1E3E2C",
  },

  cardLabel: {
    color: "#95B9A4",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#F3FFF7",
    fontSize: 23,
    fontWeight: "900",
    marginBottom: 18,
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#183423",
  },

  paymentLabel: {
    color: "#8EA997",
    fontSize: 14,
  },

  paymentValue: {
    color: "#F4FFF8",
    fontSize: 14,
    fontWeight: "800",
  },

  primaryButton: {
    backgroundColor: "#D7FF43",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#07130E",
    fontWeight: "900",
    fontSize: 15,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#2E5D40",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 30,
  },

  secondaryButtonText: {
    color: "#D8FFE8",
    fontWeight: "800",
  },

  inputBar: {
    flexDirection: "row",
    backgroundColor: "#F4FFF8",
    borderRadius: 22,
    marginTop: 16,
    marginBottom: 35,
    padding: 7,
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingHorizontal: 14,
    color: "#07130E",
    fontSize: 14,
  },

  micButton: {
    width: 46,
    height: 46,
    backgroundColor: "#07130E",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  micText: {
    fontSize: 20,
  },

  confirmTop: {
    marginTop: 6,
    marginBottom: 18,
  },

  sectionTitle: {
    color: "#F3FFF7",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
  },

  sectionText: {
    color: "#9AB5A5",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  bigAmountCard: {
    backgroundColor: "#D7FF43",
    borderRadius: 30,
    padding: 22,
    marginBottom: 14,
  },

  bigAmount: {
    color: "#07130E",
    fontSize: 43,
    fontWeight: "900",
    letterSpacing: -1,
  },

  amountInput: {
    backgroundColor: "rgba(7, 19, 14, 0.1)",
    color: "#07130E",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 14,
    fontSize: 16,
    fontWeight: "800",
  },

  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10291C",
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1E3E2C",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#F4FFF8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  avatarText: {
    color: "#07130E",
    fontWeight: "900",
  },

  recipientName: {
    color: "#F4FFF8",
    fontSize: 16,
    fontWeight: "900",
  },

  recipientMeta: {
    color: "#91AA9B",
    marginTop: 4,
    fontSize: 13,
  },

  verified: {
    color: "#D7FF43",
    fontSize: 12,
    fontWeight: "900",
  },

  detailsCard: {
    backgroundColor: "#0F2419",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1E3E2C",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#183423",
  },

  detailLabel: {
    color: "#8EA997",
    fontSize: 14,
  },

  detailValue: {
    color: "#F4FFF8",
    fontSize: 14,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right",
  },

  successCard: {
    backgroundColor: "#10291C",
    borderRadius: 24,
    padding: 22,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F5C3C",
  },

  successIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  successTitle: {
    color: "#F4FFF8",
    fontSize: 20,
    fontWeight: "900",
  },

  successText: {
    color: "#9AB5A5",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  uploadBox: {
    backgroundColor: "#10291C",
    borderRadius: 30,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#3A7650",
    marginBottom: 16,
  },

  cameraIcon: {
    fontSize: 52,
    marginBottom: 15,
  },

  uploadTitle: {
    color: "#F4FFF8",
    fontSize: 21,
    fontWeight: "900",
  },

  uploadText: {
    color: "#9AB5A5",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  detectedCard: {
    backgroundColor: "#0F2419",
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E3E2C",
  },

  insightCard: {
    backgroundColor: "#D7FF43",
    borderRadius: 26,
    padding: 20,
    marginTop: 16,
    marginBottom: 35,
  },

  insightTitle: {
    color: "#07130E",
    fontSize: 20,
    fontWeight: "900",
  },

  insightText: {
    color: "#284015",
    marginTop: 8,
    lineHeight: 21,
    fontWeight: "600",
  },
});