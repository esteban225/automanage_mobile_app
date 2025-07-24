import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener esto instalado

export default function ModalActionCircle() {
  const { name, lastChange, nextChange, description } = useLocalSearchParams();

  const formatDate = (dateString: string | string[] | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString as string);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatus = () => {
    const today = new Date();
    const next = new Date(nextChange as string);
    const diffDays = Math.ceil((next.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays > 30) {
      return { status: "Al día", color: "#28a745", daysLeft: diffDays, icon: "checkmark-circle", action: "Todo OK" };
    } else if (diffDays > 7) {
      return { status: "Revisión Sugerida", color: "#ffc107", daysLeft: diffDays, icon: "warning", action: "Revisar" };
    } else if (diffDays >= 0) {
      return { status: "Cambio Urgente", color: "#dc3545", daysLeft: diffDays, icon: "alert-circle", action: "Cambiar" };
    } else {
      return { status: "Vencido", color: "#6c757d", daysLeft: diffDays, icon: "close-circle", action: "Urgente" };
    }
  };

  const statusInfo = getStatus();
  const progressPercent = Math.max(0, Math.min(100, (30 - statusInfo.daysLeft) / 30 * 100));

  return (
    <View style={styles.centeredView}>
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.divider} />

        <Text style={styles.description}>{description || "Sin descripción disponible."}</Text>

        <View style={styles.detailBlock}>
          <Text style={styles.label}>Último cambio:</Text>
          <Text style={styles.value}>{formatDate(lastChange)}</Text>
        </View>

        <View style={styles.detailBlock}>
          <Text style={styles.label}>Próximo cambio:</Text>
          <Text style={styles.value}>{formatDate(nextChange)}</Text>
        </View>

        <View style={[styles.statusContainer, { backgroundColor: statusInfo.color + "20" }]}>
          <Ionicons name={statusInfo.icon as any} size={22} color={statusInfo.color} style={styles.statusIcon} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.status}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%`, backgroundColor: statusInfo.color }]} />
        </View>

        <Text style={styles.daysLeft}>
          {statusInfo.daysLeft >= 0
            ? `Faltan ${statusInfo.daysLeft} días para el cambio.`
            : `Pasaron ${Math.abs(statusInfo.daysLeft)} días desde la fecha programada.`}
        </Text>

        <Pressable style={[styles.button, { backgroundColor: statusInfo.color }]} onPress={() => console.log("Acción:", statusInfo.action)}>
          <Text style={styles.buttonText}>{statusInfo.action}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAFDFC",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#134E4A",
    marginBottom: 10,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDE2E2",
    marginVertical: 14,
  },
  description: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 18,
    textAlign: "center",
  },
  detailBlock: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#6C757D",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  statusContainer: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#E9ECEF",
    borderRadius: 20,
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 20,
  },
  daysLeft: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 15,
    color: "#495057",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
