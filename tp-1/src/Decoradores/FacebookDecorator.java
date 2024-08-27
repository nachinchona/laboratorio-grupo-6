public class FacebookDecorator extends DecoradorNotificador {
    public FacebookDecorator(Notificador notificador){
        super(notificador);
    }

    public void enviar(String mensaje){
        //super.enviar(mensaje + "\nPor Facebook: " + mensaje);
        super.enviar(mensaje);
        super.mandar("Por Facebook: " + mensaje);
    }
}
