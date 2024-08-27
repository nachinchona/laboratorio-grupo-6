public interface Notificador {
    void enviar(String mensaje);
    EnvioControl getEnv();
    GUI getGUI();
}
