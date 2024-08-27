import javax.swing.*;
import javax.swing.text.DefaultCaret;

import java.awt.Font;
import java.awt.Insets;


public class GUI {
    private static String[] acciones = { "SMS", "WhatsApp", "Facebook", "Start Concurrencia", "Stop Concurrencia" };
    private JFrame frame;
    private JLabel titulo;
    private JPanel panelPrincipal;
    private JPanel panelBotones;
    private JPanel panelConsola;
    private JPanel panelEnviar;
    private JScrollPane output;
    private JTextArea consola;
    private JButton[] botones;
    private JTextField mensaje;
    private JButton botonEnviar;
    private Notificador notificador;
    private EnvioControl control;

    public GUI() {
        control = new EnvioControl();
        notificador = new NotificadorBase(this, control);

        frame = new JFrame("Aplicacion");

        // panel principal donde se acomodan los dem�s paneles

        panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new BoxLayout(panelPrincipal, BoxLayout.Y_AXIS));

        titulo = new JLabel("Bienvenido al menu!");
        titulo.setAlignmentX(JLabel.CENTER_ALIGNMENT);

        panelPrincipal.add(titulo);

        // panel de botones para suscribirse a notificaciones

        panelBotones = new JPanel();

        JPanel panelConcurrencia = new JPanel();

        botones = new JButton[5];
        for (int i = 0; i < botones.length; i++) {
            botones[i] = new JButton(acciones[i]);
            if (i == 3 || i == 4) {
                panelConcurrencia.add(botones[i]);
            } else {
                panelBotones.add(botones[i]);
            }

        }

        panelPrincipal.add(panelBotones);
        panelPrincipal.add(panelConcurrencia);

        // panel para boton enviar y entrada de texto

        panelEnviar = new JPanel();
        botonEnviar = new JButton("Enviar notificacion");
        mensaje = new JTextField();
        mensaje.setColumns(30);
        mensaje.setFont(new Font("Arial", Font.PLAIN, 20));
        panelEnviar.add(mensaje);
        panelEnviar.add(botonEnviar);

        panelPrincipal.add(panelEnviar);

        consola = new JTextArea(15, 55);
        consola.setMargin(new Insets(10, 10, 20, 10));

        // para que el scroll se mueva lo mas bajo posible automaticamente
        DefaultCaret caret = (DefaultCaret) consola.getCaret();
        caret.setUpdatePolicy(DefaultCaret.ALWAYS_UPDATE);

        output = new JScrollPane(consola);
        panelConsola = new JPanel();
        panelConsola.add(output);
        panelPrincipal.add(panelConsola);

        frame.add(panelPrincipal);

        frame.setSize(700, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

        // acciones
        botones[0].addActionListener(e -> {
            notificador = new SMSDecorator(notificador);
            botones[0].setEnabled(false);
        });
        botones[1].addActionListener(e -> {
            notificador = new WhatsAppDecorator(notificador);
            botones[1].setEnabled(false);
        });
        botones[2].addActionListener(e -> {
            notificador = new FacebookDecorator(notificador);
            botones[2].setEnabled(false);
        });
        botones[3].addActionListener(e -> {
            if (control != null) {
                control.setNotificador(notificador);
            }
            control.start();
        });
        botones[4].addActionListener(e -> {
            control.interrupt();
        });
        botonEnviar.addActionListener(e -> notificador.enviar(mensaje.getText()));
    }

    public void agregarTexto(String cadena) {
        consola.append(cadena + "\n");
    }
}
