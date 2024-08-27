
public interface Notificador {
    void enviar(String mensaje);
    void mandar(String mensaje);
    EnvioControl getEnv();
}
