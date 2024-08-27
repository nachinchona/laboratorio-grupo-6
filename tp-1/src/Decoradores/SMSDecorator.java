public class SMSDecorator extends DecoradorNotificador {
    public SMSDecorator(Notificador notificador){
        super(notificador);
    }

    public void enviar(String mensaje){
        //super.enviar(mensaje + "\nPor SMS: " + mensaje);
        super.enviar(mensaje);
        super.mandar("Por SMS: " + mensaje);
    }
}
